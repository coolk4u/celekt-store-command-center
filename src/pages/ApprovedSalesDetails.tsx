import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, IndianRupee } from "lucide-react";

// Dummy data for opportunities
const dummyOpportunities = [
  {
    id: "1",
    name: "John Doe Project",
    account: {
      name: "John Doe",
      phone: "+91 98765 43210"
    },
    amount: 25000,
    stageName: "Closed Won",
    managerComments: "Customer approved the final quote. Ready for billing.",
    expectedDiscount: 15,
    approvedDate: "2024-03-15",
    convertedLead: {
      productInterest: "Enterprise CRM License"
    },
    billNumber: "INV-2024-001",
    billingAmount: 21250,
    billingPhoto: ""
  },
  {
    id: "2",
    name: "ABC Corp Implementation",
    account: {
      name: "ABC Corporation",
      phone: "+91 87654 32109"
    },
    amount: 50000,
    stageName: "Closed Won",
    managerComments: "Special pricing approved by regional manager.",
    expectedDiscount: 20,
    approvedDate: "2024-03-14",
    convertedLead: {
      productInterest: "Cloud Infrastructure Package"
    },
    billNumber: "INV-2024-002",
    billingAmount: 40000,
    billingPhoto: ""
  },
  {
    id: "3",
    name: "XYZ Ltd Service Contract",
    account: {
      name: "XYZ Limited",
      phone: "+91 76543 21098"
    },
    amount: 35000,
    stageName: "Closed Won",
    managerComments: "Annual maintenance contract with premium support.",
    expectedDiscount: 10,
    approvedDate: "2024-03-13",
    convertedLead: {
      productInterest: "Annual Support Package"
    },
    billNumber: "INV-2024-003",
    billingAmount: 31500,
    billingPhoto: ""
  }
];

const ApprovedSalesDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const opportunityId = location.pathname.split("/").pop();

  const [opportunity, setOpportunity] = useState<any>(null);
  const [billNumber, setBillNumber] = useState("");
  const [billingAmount, setBillingAmount] = useState("");
  const [billingPhoto, setBillingPhoto] = useState("");

  useEffect(() => {
    // Simulate API call with dummy data
    const fetchOpportunity = () => {
      setTimeout(() => {
        const foundOpportunity = dummyOpportunities.find(
          (opp) => opp.id === opportunityId
        );
        
        if (foundOpportunity) {
          setOpportunity(foundOpportunity);
          setBillNumber(foundOpportunity.billNumber || "");
          setBillingAmount(foundOpportunity.billingAmount?.toString() || "");
          setBillingPhoto(foundOpportunity.billingPhoto || "");
        }
      }, 300); // Simulate network delay
    };

    fetchOpportunity();
  }, [opportunityId]);

  const handleSaveBill = () => {
    try {
      // Simulate saving data
      console.log("Saving billing data:", {
        opportunityId,
        billNumber,
        billingAmount: parseFloat(billingAmount),
      });

      // Update local state
      setOpportunity({
        ...opportunity,
        billNumber,
        billingAmount: parseFloat(billingAmount),
        billingPhoto
      });

      alert("Billing data saved successfully.");
      
      // In a real app, you would make an API call here
      // await axios.post('/api/updateBilling', {
      //   opportunityId,
      //   billNumber,
      //   billingAmount: parseFloat(billingAmount),
      // });
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
              {opportunity.account?.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600">
              <p>Phone: {opportunity.account?.phone}</p>
              <p>
                Product: {opportunity.convertedLead?.productInterest}
              </p>
              <p>Status: {opportunity.stageName}</p>
              <p>
                Approved Date:{" "}
                {opportunity.approvedDate
                  ? new Date(opportunity.approvedDate).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Original Price:</span>
                <span className="flex items-center text-gray-900">
                  <IndianRupee className="h-3 w-3 mr-1" />
                  {(opportunity.amount || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Discount (%):</span>
                <span className="flex items-center text-red-600">
                  {opportunity.expectedDiscount || 0}%
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span>Final Price:</span>
                <span className="flex items-center text-green-600">
                  <IndianRupee className="h-3 w-3 mr-1" />
                  {(
                    (opportunity.amount || 0) *
                    (1 - (opportunity.expectedDiscount || 0) / 100)
                  ).toFixed(0)}
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Manager Notes:</p>
              <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                {opportunity.managerComments}
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
