
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';

const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent successfully!");
  };

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-display font-bold mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Get In Touch</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input id="name" placeholder="Enter your name" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="Enter your email" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="Enter subject" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Enter your message here" 
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full md:w-auto">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Contact Information</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-sm text-muted-foreground">
                    Barasat, Kazipara<br />
                    West Bengal, India
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-sm text-muted-foreground">
                    +91 8918787936
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    contact@agrocart.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Working Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Monday - Saturday: 9:00 AM - 6:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardContent className="p-4">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29194.587036600136!2d88.44651410290299!3d22.720713863919183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89c6c714422d1%3A0x42dc0073a4685274!2sBarasat%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1651258954270!5m2!1sen!2sin" 
                width="100%" 
                height="200" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="AgroCart Location"
              ></iframe>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
