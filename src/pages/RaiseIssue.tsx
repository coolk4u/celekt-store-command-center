
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Camera, ArrowLeft, AlertTriangle } from 'lucide-react';

const RaiseIssue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    priority: 'Medium',
    photos: [] as File[]
  });

  const categories = [
    'Electrical',
    'Air Conditioning',
    'Furniture/Fixtures',
    'Security Systems',
    'Cleanliness',
    'Other'
  ];

  const handlePhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...files]
      }));
      toast.success(`${files.length} photo(s) uploaded`);
    };
    input.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Issue raised successfully!');
    navigate('/issues');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-teal-50/50 pb-20">
      <Header title="Raise Issue" />
      
      <div className="max-w-md mx-auto p-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/issues')}
          className="mb-6 p-0 h-auto hover:bg-gray-100 rounded-lg px-2 py-1"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="font-medium">Back to Issues</span>
        </Button>

        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl text-gray-900">
              <AlertTriangle className="h-6 w-6 mr-3 text-primary" />
              Report New Issue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-semibold text-gray-700">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, category: value }))
                }>
                  <SelectTrigger className="border-gray-200 focus:border-primary/50 focus:ring-primary/20">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-semibold text-gray-700">Short Description *</Label>
                <Input
                  id="title"
                  placeholder="Brief description of the issue"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  className="border-gray-200 focus:border-primary/50 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Detailed Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about the issue..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[120px] border-gray-200 focus:border-primary/50 focus:ring-primary/20"
                  required
                />
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-semibold text-gray-700">Priority Level</Label>
                <RadioGroup
                  value={formData.priority}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                  className="space-y-3"
                >
                  {['Low', 'Medium', 'High'].map((priority) => (
                    <div key={priority} className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all ${
                      formData.priority === priority ? getPriorityColor(priority) : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                    }`}>
                      <RadioGroupItem value={priority} id={priority.toLowerCase()} />
                      <Label htmlFor={priority.toLowerCase()} className="font-medium cursor-pointer">
                        {priority}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">Photos (Optional)</Label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePhotoUpload}
                  className="w-full h-14 border-2 border-dashed border-gray-300 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 rounded-xl"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  <span className="font-medium">
                    {formData.photos.length > 0 ? `${formData.photos.length} photo(s) selected` : 'Upload Photos'}
                  </span>
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-red-600 hover:from-primary/90 hover:to-red-600/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 h-14 rounded-xl"
              >
                Submit Issue
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default RaiseIssue;
