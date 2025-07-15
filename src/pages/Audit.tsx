
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

    // Simulate submission
    setIsSubmitted(true);
    toast.success('Daily audit submitted successfully!');
  };

  const getCompletionPercentage = () => {
    const completed = auditItems.filter(item => item.answer !== null).length;
    return Math.round((completed / auditItems.length) * 100);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header title="Daily Audit" />
        <div className="max-w-md mx-auto p-4 flex items-center justify-center min-h-[60vh]">
          <Card className="w-full text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Audit Completed!</h3>
              <p className="text-muted-foreground mb-4">
                Your daily audit for {new Date().toLocaleDateString()} has been submitted successfully.
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="w-full"
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
    <div className="min-h-screen bg-background pb-20">
      <Header title="Daily Audit" />
      
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Progress */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{getCompletionPercentage()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all"
                style={{ width: `${getCompletionPercentage()}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Date */}
        <Card>
          <CardContent className="p-4">
            <Label className="text-sm font-medium">Audit Date</Label>
            <p className="text-lg font-semibold mt-1">{new Date(auditDate).toLocaleDateString()}</p>
          </CardContent>
        </Card>

        {/* Audit Items */}
        {auditItems.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{item.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={item.answer || ''}
                onValueChange={(value) => updateAuditItem(item.id, 'answer', value as 'yes' | 'no')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id={`${item.id}-yes`} />
                  <Label htmlFor={`${item.id}-yes`} className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-1" />
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id={`${item.id}-no`} />
                  <Label htmlFor={`${item.id}-no`} className="flex items-center">
                    <X className="h-4 w-4 text-red-600 mr-1" />
                    No
                  </Label>
                </div>
              </RadioGroup>

              <div>
                <Label htmlFor={`${item.id}-comments`} className="text-sm">Comments (Optional)</Label>
                <Textarea
                  id={`${item.id}-comments`}
                  placeholder="Add any additional comments..."
                  value={item.comments}
                  onChange={(e) => updateAuditItem(item.id, 'comments', e.target.value)}
                  className="mt-1"
                />
              </div>

              {item.photoRequired && (
                <div>
                  <Label className="text-sm">Photo Upload {item.answer === 'no' ? '(Required)' : '(Optional)'}</Label>
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
                      {item.photo ? 'Photo Uploaded' : 'Take Photo'}
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
          className="w-full bg-red-600 hover:bg-red-700 text-white"
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
