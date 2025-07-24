import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, IndianRupee } from "lucide-react";

const ApprovedSalesDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const opportunityId = location.pathname.split("/").pop();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [opportunity, setOpportunity] = useState<any>(null);
  const [billNumber, setBillNumber] = useState("");
  const [billingAmount, setBillingAmount] = useState("");
  const [billingPhoto, setBillingPhoto] = useState("");

  const getAccessToken = async () => {
    const url =
      "https://4cecloudlabscustomerdemos-dev-ed.develop.my.salesforce.com/services/oauth2/token";
    const clientId =
      "3MVG9BBZP0d0A9KAcJnBKSzCfrRE_gMs1F.S7Uw0j_NByrWXPE6QjuPbeOqXjD7ud8_N3h5OFhGobUpSI.nRR";
    const clientSecret =
      "B36DBB1474A5226DEE9C3696BA1080A63AD857EBF1735E4816D7931E8EA79A6C";

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);

    const response = await axios.post(url, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    setAccessToken(response.data.access_token);
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  useEffect(() => {
    if (!accessToken || !opportunityId) return;

    const fetchOpportunity = async () => {
      const query = `
        SELECT Id, Name, Account.Name, Account.Phone, Amount, StageName,
               Manager_Comments__c, Expected_Discount__c, Approved_Date__c,
               Converted_Lead__r.ProductInterest__c,
               Bill_Number__c, Billing_Amount__c, Billing_Photo__c
        FROM Opportunity
        WHERE Id = '${opportunityId}'
      `.replace(/\s+/g, "+");

      const queryUrl = `https://4cecloudlabscustomerdemos-dev-ed.develop.my.salesforce.com/services/data/v62.0/query?q=${query}`;
      const response = await axios.get(queryUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const record = response.data.records[0];
      setOpportunity(record);
      setBillNumber(record.Bill_Number__c || "");
      setBillingAmount(record.Billing_Amount__c || "");
      setBillingPhoto(record.Billing_Photo__c || "");
    };

    fetchOpportunity();
  }, [accessToken, opportunityId]);

  const handleSaveBill = async () => {
    if (!accessToken || !opportunityId) return;

    try {
await axios.post(
  `https://4cecloudlabscustomerdemos-dev-ed.develop.my.salesforce.com/services/apexrest/updateBilling`,
  {
    opportunityId,
    billNumber,
    billingAmount: parseFloat(billingAmount), // ✅ convert to number
  },
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }
);

      alert("Billing data saved successfully.");
    } catch (error) {
      console.error("Error saving bill details: ", error);
      alert("Failed to save billing data.");
    }
  };

  if (!opportunity) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header title="Sale Details" />
      <div className="max-w-md mx-auto p-4 space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/approved-sales")}
          className="mb-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Approved Sales
        </Button>

        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-gray-900">
              {opportunity.Account?.Name}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600">
              <p>Phone: {opportunity.Account?.Phone}</p>
              <p>
                Product: {opportunity.Converted_Lead__r?.ProductInterest__c}
              </p>
              <p>Status: {opportunity.StageName}</p>
              <p>
                Approved Date:{" "}
                {opportunity.Approved_Date__c
                  ? new Date(opportunity.Approved_Date__c).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Original Price:</span>
                <span className="flex items-center text-gray-900">
                  <IndianRupee className="h-3 w-3 mr-1" />
                  {(opportunity.Amount || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Discount (%):</span>
                <span className="flex items-center text-red-600">
                  {opportunity.Expected_Discount__c || 0}%
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span>Final Price:</span>
                <span className="flex items-center text-green-600">
                  <IndianRupee className="h-3 w-3 mr-1" />
                  {(
                    (opportunity.Amount || 0) *
                    (1 - (opportunity.Expected_Discount__c || 0) / 100)
                  ).toFixed(0)}
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Manager Notes:</p>
              <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                {opportunity.Manager_Comments__c}
              </p>
            </div>

            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm text-gray-600">Bill Number</label>
                <Input
                  value={billNumber}
                  onChange={(e) => setBillNumber(e.target.value)}
                  placeholder="Enter bill number"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Billing Amount</label>
                <Input
                  value={billingAmount}
                  onChange={(e) => setBillingAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
              {/* <div>
                <label className="text-sm text-gray-600">
                  Billing Photo URL
                </label>
                <Textarea
                  value={billingPhoto}
                  onChange={(e) => setBillingPhoto(e.target.value)}
                  placeholder="Paste photo URL"
                />
              </div> */}
              <Button
                onClick={handleSaveBill}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Save Billing Info
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default ApprovedSalesDetails;
