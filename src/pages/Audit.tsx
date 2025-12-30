import { useState } from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Camera, Check, X } from 'lucide-react';

interface AuditItem {
  id: string;
  question: string;
  answer: 'yes' | 'no' | null;
  comments: string;
  photoRequired: boolean;
  photo?: File;
}

// Dummy audit data in JSON format
const dummyAuditData = {
  auditId: 'AUDIT-001',
  storeId: 'STORE-123',
  storeName: 'Downtown Location',
  auditDate: new Date().toISOString().split('T')[0],
  auditor: 'John Doe',
  status: 'completed',
  items: [
    { id: 'cleaning', question: 'Store cleaned?', answer: 'yes', comments: 'Store was thoroughly cleaned', photoRequired: true },
    { id: 'mopping', question: 'Floor mopping done?', answer: 'yes', comments: 'Floors mopped and dried', photoRequired: true },
    { id: 'opening', question: 'Store opened on time?', answer: 'yes', comments: 'Opened at 8:00 AM sharp', photoRequired: false },
    { id: 'signage', question: 'Signages working?', answer: 'no', comments: 'One sign needs replacement', photoRequired: true },
    { id: 'stock', question: 'Stock displayed properly?', answer: 'yes', comments: 'All products neatly arranged', photoRequired: true }
  ],
  summary: {
    totalItems: 5,
    completedItems: 5,
    score: '90%',
    issuesFound: 1
  }
};

const Audit = () => {
  const [auditDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [auditItems, setAuditItems] = useState<AuditItem[]>([
    { id: 'cleaning', question: 'Store cleaned?', answer: null, comments: '', photoRequired: true },
    { id: 'mopping', question: 'Floor mopping done?', answer: null, comments: '', photoRequired: true },
    { id: 'opening', question: 'Store opened on time?', answer: null, comments: '', photoRequired: false },
    { id: 'signage', question: 'Signages working?', answer: null, comments: '', photoRequired: true },
    { id: 'stock', question: 'Stock displayed properly?', answer: null, comments: '', photoRequired: true }
  ]);

  const updateAuditItem = (id: string, field: keyof AuditItem, value: any) => {
    setAuditItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handlePhotoUpload = (id: string, file: File) => {
    updateAuditItem(id, 'photo', file);
    toast.success('Photo uploaded successfully');
  };

  const handleSubmit = async () => {
    const incomplete = auditItems.filter(item => item.answer === null);
    if (incomplete.length > 0) {
      toast.error('Please complete all audit items');
      return;
    }

    try {
      // Create dummy submission payload
      const dummyPayload = {
        ...dummyAuditData,
        submittedAt: new Date().toISOString(),
        responses: auditItems.map(item => ({
          id: item.id,
          answer: item.answer,
          comments: item.comments,
          hasPhoto: !!item.photo
        }))
      };

      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('✅ Audit submitted with dummy data:', JSON.stringify(dummyPayload, null, 2));
      
      // Show success message
      toast.success('Audit submitted successfully with dummy data');
      setIsSubmitted(true);
      
    } catch (err: any) {
      console.error('❌ Error submitting audit:', err);
      toast.error('Submission failed - using dummy data instead');
      
      // Fallback: still mark as submitted for demo purposes
      setIsSubmitted(true);
    }
  };

  const getCompletionPercentage = () => {
    const completed = auditItems.filter(item => item.answer !== null).length;
    return Math.round((completed / auditItems.length) * 100);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-teal-50/50 pb-20">
        <Header title="Daily Audit" />
        <div className="max-w-md mx-auto p-4 flex items-center justify-center min-h-[60vh]">
          <Card className="w-full text-center border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Check className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Audit Completed!</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Your daily audit for {new Date().toLocaleDateString()} has been submitted successfully.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Dummy Data Generated:</h4>
                <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
                  {JSON.stringify({
                    auditId: 'AUDIT-' + Math.floor(Math.random() * 1000),
                    storeId: 'STORE-' + Math.floor(Math.random() * 100),
                    timestamp: new Date().toISOString(),
                    itemsCompleted: auditItems.length,
                    status: 'submitted'
                  }, null, 2)}
                </pre>
              </div>
              <Button onClick={() => setIsSubmitted(false)} variant="outline" className="w-full">
                View Submission
              </Button>
            </CardContent>
          </Card>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-teal-50/50 pb-20">
      <Header title="Daily Audit" />
      <div className="max-w-md mx-auto p-4 space-y-6">
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-900">Progress</span>
              <span className="text-sm font-bold text-primary">{getCompletionPercentage()}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-red-600 h-3 rounded-full" 
                style={{ width: `${getCompletionPercentage()}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {auditItems.map((item) => (
          <Card key={item.id} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-gray-900">{item.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <RadioGroup 
                value={item.answer || ''} 
                onValueChange={(value) => updateAuditItem(item.id, 'answer', value as 'yes' | 'no')}
              >
                <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-green-50/50">
                  <RadioGroupItem value="yes" id={`${item.id}-yes`} />
                  <Label htmlFor={`${item.id}-yes`} className="flex items-center cursor-pointer text-gray-900">
                    <Check className="h-4 w-4 text-green-600 mr-2" /> Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50/50">
                  <RadioGroupItem value="no" id={`${item.id}-no`} />
                  <Label htmlFor={`${item.id}-no`} className="flex items-center cursor-pointer text-gray-900">
                    <X className="h-4 w-4 text-red-600 mr-2" /> No
                  </Label>
                </div>
              </RadioGroup>
              <div>
                <Label htmlFor={`${item.id}-comments`} className="text-sm font-medium text-gray-900">
                  Comments
                </Label>
                <Textarea 
                  id={`${item.id}-comments`} 
                  placeholder="Add comments..." 
                  value={item.comments} 
                  onChange={(e) => updateAuditItem(item.id, 'comments', e.target.value)} 
                  className="mt-2 border-gray-200" 
                />
              </div>
              {item.photoRequired && (
                <div>
                  <Label className="text-sm font-medium text-gray-900">Photo Upload</Label>
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) handlePhotoUpload(item.id, file);
                        };
                        input.click();
                      }}
                      className="w-full"
                    >
                      <Camera className="h-4 w-4 mr-2" /> 
                      {item.photo ? '✓ Photo Uploaded' : 'Upload Photo'}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <Button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-primary to-red-600 text-white"
          size="lg"
          disabled={getCompletionPercentage() < 100}
        >
          Submit Audit
        </Button>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Audit;
