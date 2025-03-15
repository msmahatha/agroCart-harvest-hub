
import React from 'react';
import { Leaf, Mail, MapPin, Phone, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bg-background mt-auto border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="text-primary h-6 w-6 mr-2" />
              <span className="font-display text-lg font-semibold">AgroCart</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Your one-stop shop for all agricultural needs. Quality products for farmers and gardeners.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary text-sm">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-base font-semibold mb-4">Customer Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping-policy" className="text-muted-foreground hover:text-primary text-sm">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-muted-foreground hover:text-primary text-sm">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 className="text-base font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to receive updates on new products and special promotions.
            </p>
            <div className="flex space-x-2 mb-6">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="max-w-[200px]"
              />
              <Button variant="default" size="sm">
                Subscribe
              </Button>
            </div>
            <h3 className="text-base font-semibold mb-2">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                <span>Barasat, Kazipara, West Bengal, India</span>
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                <span>+91 8918787936</span>
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@agrocart.com</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AgroCart. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-12 bg-background border rounded shadow-sm flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#1434CB]" fill="currentColor">
                <path d="M21.5824 13.0606H19.3315L18.6139 16.6752H16.4585L17.1761 13.0606H15.067V10.9442H17.6009L18.1366 8.16761H16.0276V6.05121H18.5615L19.2791 2.38672H21.4345L20.7639 6.05121H22.9669L23.6845 2.38672H25.8399L25.1223 6.05121H27.2737V8.16761H24.6828L24.1471 10.9442H26.2561V13.0606H23.7222L23.0046 16.7242H20.8493L21.5669 13.0606H19.3639" />
                <path d="M11.2561 2.435V7.34885C11.2561 7.34885 9.8884 6.56428 8.37851 6.56428C5.62262 6.56428 3.14114 8.85322 3.14114 12.2957C3.14114 15.6894 5.57196 18.0273 8.42917 18.0273C10.0401 18.0273 11.3571 17.145 11.3571 17.145L11.297 22.0099C11.297 22.0099 9.98001 22.3573 8.33693 22.3573C3.92424 22.3573 0 18.6653 0 12.3937C0 6.36825 3.82285 2.38574 8.66467 2.38574C10.2254 2.38574 11.2561 2.435 11.2561 2.435Z" />
              </svg>
            </div>
            <div className="h-8 w-12 bg-background border rounded shadow-sm flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#EB001B]" fill="currentColor">
                <path d="M7.66667 2.16699H16.3333C19.095 2.16699 21.3333 4.40533 21.3333 7.16699V16.7503C21.3333 19.512 19.095 21.7503 16.3333 21.7503H7.66667C4.905 21.7503 2.66667 19.512 2.66667 16.7503V7.16699C2.66667 4.40533 4.905 2.16699 7.66667 2.16699Z" stroke="currentColor" fill="none" />
                <path d="M12 17.5C15.0376 17.5 17.5 15.0376 17.5 12C17.5 8.96243 15.0376 6.5 12 6.5C8.96243 6.5 6.5 8.96243 6.5 12C6.5 15.0376 8.96243 17.5 12 17.5Z" stroke="currentColor" fill="none" />
                <path d="M9.5 12C9.5 13.3807 10.6193 14.5 12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12Z" fill="currentColor" />
              </svg>
            </div>
            <div className="h-8 w-12 bg-background border rounded shadow-sm flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#003087]" fill="currentColor">
                <path d="M19.4955 7.12874H16.4573C15.524 7.12874 14.7251 7.9524 14.7251 8.90956V18.5618H17.1632C17.1632 18.5618 17.4363 18.5618 17.5728 18.3999C17.7092 18.2379 17.7092 17.9141 17.7092 17.9141V13.6761H19.4955C21.4256 13.6761 23 12.0152 23 10.4381C23 8.78956 21.4256 7.12874 19.4955 7.12874Z" />
                <path d="M9.18458 7.12866H6.14646C5.21314 7.12866 4.41418 7.95233 4.41418 8.90948V18.5617H6.85231C6.85231 18.5617 7.12541 18.5617 7.26187 18.3998C7.39834 18.2379 7.39834 17.914 7.39834 17.914V13.6761H9.18458C11.1147 13.6761 12.6891 12.0152 12.6891 10.4381C12.6891 8.78948 11.1147 7.12866 9.18458 7.12866Z" />
                <path d="M1 7.93297C1 6.76249 1.92435 5.81982 3.07392 5.81982C4.22349 5.81982 5.14785 6.76249 5.14785 7.93297C5.14785 9.10345 4.22349 10.0461 3.07392 10.0461C1.92435 10.0461 1 9.10345 1 7.93297Z" />
              </svg>
            </div>
            <div className="h-8 w-12 bg-background border rounded shadow-sm flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#14BBEF]" fill="currentColor">
                <path d="M3.33332 12.6667L4.06665 10.8667H9.13332L9.86665 12.6667H3.33332Z" />
                <path d="M9.86668 12.6667L10.6 10.8667H15.6667L16.4 12.6667H9.86668Z" />
                <path d="M16.4 12.6667L17.1333 10.8667H22.2L22.9333 12.6667H16.4Z" />
                <path d="M17.3333 18.0001H15.6L16.5333 15.6667H18.2667L17.3333 18.0001Z" />
                <path d="M3.33332 7.33325L4.06665 5.53325H9.13332L9.86665 7.33325H3.33332Z" />
                <path d="M9.86668 7.33325L10.6 5.53325H15.6667L16.4 7.33325H9.86668Z" />
                <path d="M16.4 7.33325L17.1333 5.53325H22.2L22.9333 7.33325H16.4Z" />
                <path d="M10.8 18.0001H9.06665L9.99998 15.6667H11.7333L10.8 18.0001Z" />
                <path d="M7.33332 15.6667L6.4 18.0001H4.66665L5.59998 15.6667H7.33332Z" />
                <path d="M13.8667 15.6667L12.9333 18.0001H11.2L12.1333 15.6667H13.8667Z" />
                <path d="M22.9333 7.33325L3.33332 7.33325L1 10.8666L3.33332 12.6666H22.9333L20.6 10.8666L22.9333 7.33325Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
