
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

const Audit = () => {
  const [auditDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [auditItems, setAuditItems] = useState<AuditItem[]>([
    {
      id: 'cleaning',
      question: 'Store cleaned?',
      answer: null,
      comments: '',
      photoRequired: true
    },
    {
      id: 'mopping',
      question: 'Floor mopping done?',
      answer: null,
      comments: '',
      photoRequired: true
    },
    {
      id: 'opening',
      question: 'Store opened on time?',
      answer: null,
      comments: '',
      photoRequired: false
    },
    {
      id: 'signage',
      question: 'Signages working?',
      answer: null,
      comments: '',
      photoRequired: true
    },
    {
      id: 'stock',
      question: 'Stock displayed properly?',
      answer: null,
      comments: '',
      photoRequired: true
    }
  ]);

  const updateAuditItem = (id: string, field: keyof AuditItem, value: any) => {
    setAuditItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handlePhotoUpload = (id: string, file: File) => {
    updateAuditItem(id, 'photo', file);
    toast.success('Photo uploaded successfully');
  };

  const handleSubmit = () => {
    const incomplete = auditItems.filter(item => item.answer === null);
    if (incomplete.length > 0) {
      toast.error('Please complete all audit items');
      return;
    }

    setIsSubmitted(true);
    toast.success('Daily audit submitted successfully!');
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
              <p className="text-gray-600 mb-6 leading-relaxed">
                Your daily audit for {new Date().toLocaleDateString()} has been submitted successfully.
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="w-full hover:bg-gray-50 transition-colors"
                size="lg"
              >
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
        {/* Progress */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-900">Progress</span>
              <span className="text-sm font-bold text-primary">{getCompletionPercentage()}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-red-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${getCompletionPercentage()}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Date */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <Label className="text-sm font-semibold text-gray-900">Audit Date</Label>
            <p className="text-xl font-bold text-gray-900 mt-2">{new Date(auditDate).toLocaleDateString()}</p>
          </CardContent>
        </Card>

        {/* Audit Items */}
        {auditItems.map((item) => (
          <Card key={item.id} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-gray-900">{item.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <RadioGroup
                value={item.answer || ''}
                onValueChange={(value) => updateAuditItem(item.id, 'answer', value as 'yes' | 'no')}
              >
                <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-green-50/50 transition-colors">
                  <RadioGroupItem value="yes" id={`${item.id}-yes`} />
                  <Label htmlFor={`${item.id}-yes`} className="flex items-center cursor-pointer text-gray-900">
                    <Check className="h-4 w-4 text-green-600 mr-2" />
                    <span className="font-medium">Yes</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50/50 transition-colors">
                  <RadioGroupItem value="no" id={`${item.id}-no`} />
                  <Label htmlFor={`${item.id}-no`} className="flex items-center cursor-pointer text-gray-900">
                    <X className="h-4 w-4 text-red-600 mr-2" />
                    <span className="font-medium">No</span>
                  </Label>
                </div>
              </RadioGroup>

              <div>
                <Label htmlFor={`${item.id}-comments`} className="text-sm font-medium text-gray-900">Comments (Optional)</Label>
                <Textarea
                  id={`${item.id}-comments`}
                  placeholder="Add any additional comments..."
                  value={item.comments}
                  onChange={(e) => updateAuditItem(item.id, 'comments', e.target.value)}
                  className="mt-2 border-gray-200 focus:border-primary/50 focus:ring-primary/20 text-gray-900"
                />
              </div>

              {item.photoRequired && (
                <div>
                  <Label className="text-sm font-medium text-gray-900">
                    Photo Upload {item.answer === 'no' ? '(Required)' : '(Optional)'}
                  </Label>
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
                      className="w-full hover:bg-gray-50 border-gray-200 text-gray-900"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      {item.photo ? '✓ Photo Uploaded' : 'Take Photo'}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-primary to-red-600 hover:from-primary/90 hover:to-red-600/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
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
