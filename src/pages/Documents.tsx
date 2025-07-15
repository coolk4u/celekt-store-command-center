
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, Folder } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  description: string;
  type: 'PDF' | 'Image' | 'Doc';
  category: string;
  size: string;
  lastUpdated: string;
}

const Documents = () => {
  const documents: Document[] = [
    {
      id: '1',
      title: 'Store Operations Manual',
      description: 'Complete guide for daily store operations',
      type: 'PDF',
      category: 'SOPs',
      size: '2.3 MB',
      lastUpdated: '2024-01-10'
    },
    {
      id: '2',
      title: 'Daily Audit Checklist',
      description: 'Checklist for daily store audit procedures',
      type: 'PDF',
      category: 'Checklists',
      size: '0.8 MB',
      lastUpdated: '2024-01-08'
    },
    {
      id: '3',
      title: 'Customer Service Guidelines',
      description: 'Best practices for customer interaction',
      type: 'PDF',
      category: 'Policies',
      size: '1.5 MB',
      lastUpdated: '2024-01-05'
    },
    {
      id: '4',
      title: 'Safety Protocols',
      description: 'Emergency procedures and safety guidelines',
      type: 'PDF',
      category: 'SOPs',
      size: '1.2 MB',
      lastUpdated: '2024-01-03'
    },
    {
      id: '5',
      title: 'Product Price List',
      description: 'Updated pricing for all products',
      type: 'Doc',
      category: 'Circulars',
      size: '0.5 MB',
      lastUpdated: '2024-01-15'
    },
    {
      id: '6',
      title: 'Inventory Management',
      description: 'Guidelines for stock management',
      type: 'PDF',
      category: 'SOPs',
      size: '1.8 MB',
      lastUpdated: '2023-12-28'
    }
  ];

  const categories = Array.from(new Set(documents.map(doc => doc.category)));

  const getFileIcon = (type: string) => {
    return <FileText className="h-6 w-6 text-primary" />;
  };

  const handleDownload = (document: Document) => {
    console.log(`Downloading ${document.title}`);
  };

  const handleView = (document: Document) => {
    console.log(`Viewing ${document.title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-teal-50/50 pb-20">
      <Header title="Documents & SOPs" />
      
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Categories */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {categories.map((category) => {
            const count = documents.filter(doc => doc.category === category).length;
            return (
              <Card key={category} className="cursor-pointer hover:shadow-xl transition-all duration-200 border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:-translate-y-1">
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Folder className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 mb-1">{category}</h3>
                  <p className="text-xs text-muted-foreground font-medium">{count} documents</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Documents List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">All Documents</h3>
          {documents.map((document) => (
            <Card key={document.id} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-200">
              <CardContent className="p-5">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                    {getFileIcon(document.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-gray-900 mb-1">{document.title}</h4>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{document.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground font-medium">
                      <span className="px-2 py-1 bg-gray-100 rounded-full">{document.type}</span>
                      <span>{document.size}</span>
                      <span>Updated: {new Date(document.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(document)}
                    className="flex-1 border-gray-200 hover:bg-gray-50 font-medium rounded-xl"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(document)}
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-white font-medium rounded-xl transition-all duration-200"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Documents;
