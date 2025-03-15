
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Leaf } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-display font-bold mb-8">About AgroCart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold flex items-center">
                <Leaf className="mr-2 h-5 w-5 text-primary" /> Our Story
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Founded in 2020, AgroCart began with a simple mission: to bridge the gap between farmers and quality agricultural products. What started as a small operation in Barasat has grown into a trusted name in agricultural supplies across India.
              </p>
              <p>
                As farmers ourselves, we understand the challenges of finding reliable, high-quality products at fair prices. That's why we've built our business on the principles of quality, affordability, and excellent customer service.
              </p>
              <p>
                Today, we serve thousands of farmers and gardening enthusiasts, providing everything from premium seeds and organic fertilizers to advanced farming equipment. Our dedicated team works tirelessly to source the best products from trusted manufacturers and deliver them directly to your doorstep.
              </p>
              
              <h3 className="text-xl font-medium mt-6">Our Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Quality First</h4>
                    <p className="text-sm text-muted-foreground">We rigorously test and select only the highest quality products for our catalog.</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Farmer-Centric</h4>
                    <p className="text-sm text-muted-foreground">Every decision we make puts the needs of farmers and gardeners first.</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Sustainability</h4>
                    <p className="text-sm text-muted-foreground">We promote sustainable farming practices and environmentally friendly products.</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Community</h4>
                    <p className="text-sm text-muted-foreground">We believe in building a community of knowledge-sharing among agricultural practitioners.</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Our Team</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                  <Leaf className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-medium mt-2">Ram</h3>
                <p className="text-sm text-muted-foreground">Founder & CEO</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Our Locations</h3>
                <p className="text-sm">
                  <strong>Headquarters:</strong><br />
                  Barasat, Kazipara<br />
                  West Bengal, India
                </p>
                <p className="text-sm mt-2">
                  <strong>Contact:</strong><br />
                  Phone: +91 8918787936<br />
                  Email: contact@agrocart.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
