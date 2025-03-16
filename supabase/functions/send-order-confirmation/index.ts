
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderConfirmationRequest {
  email: string;
  orderId: string;
  orderDate: string;
  total: number;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  shippingAddress?: {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const orderData: OrderConfirmationRequest = await req.json();
    const { email, orderId, orderDate, total, items, shippingAddress } = orderData;

    console.log("Sending order confirmation email to:", email);
    
    // Generate items HTML for the email
    const itemsHtml = items.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price.toLocaleString('en-IN')}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
      </tr>
    `).join('');

    const shippingCost = total >= 5000 ? 0 : 150;
    const taxAmount = total * 0.18; // GST 18%
    const grandTotal = total + shippingCost + taxAmount;

    const emailResponse = await resend.emails.send({
      from: "AgroKart <order-confirmation@resend.dev>",
      to: [email],
      subject: `Your AgroKart Order #${orderId} Confirmation`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #2e7d32; margin-bottom: 5px;">Order Confirmation</h1>
            <p style="color: #666;">Thank you for your order!</p>
          </div>
          
          <div style="background-color: #f9f9f9; border-radius: 5px; padding: 15px; margin-bottom: 20px;">
            <h2 style="margin-top: 0; font-size: 16px;">Order Details</h2>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Order Date:</strong> ${orderDate}</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px; text-align: left;">Product</th>
                <th style="padding: 10px; text-align: center;">Qty</th>
                <th style="padding: 10px; text-align: right;">Price</th>
                <th style="padding: 10px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold;">Subtotal:</td>
                <td style="padding: 10px; text-align: right;">₹${total.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td colspan="3" style="padding: 10px; text-align: right;">Shipping:</td>
                <td style="padding: 10px; text-align: right;">₹${shippingCost.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td colspan="3" style="padding: 10px; text-align: right;">Tax (GST 18%):</td>
                <td style="padding: 10px; text-align: right;">₹${taxAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
              </tr>
              <tr>
                <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold; font-size: 16px;">Grand Total:</td>
                <td style="padding: 10px; text-align: right; font-weight: bold; font-size: 16px;">₹${grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
              </tr>
            </tfoot>
          </table>
          
          ${shippingAddress ? `
          <div style="background-color: #f9f9f9; border-radius: 5px; padding: 15px; margin-bottom: 20px;">
            <h2 style="margin-top: 0; font-size: 16px;">Shipping Address</h2>
            <p>${shippingAddress.name || ''}</p>
            <p>${shippingAddress.address || ''}</p>
            <p>${shippingAddress.city || ''}, ${shippingAddress.state || ''} ${shippingAddress.zipCode || ''}</p>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <p>Thank you for shopping with AgroKart!</p>
            <p>If you have any questions about your order, please contact our customer service at <a href="mailto:support@agrokart.com" style="color: #2e7d32;">support@agrokart.com</a></p>
          </div>
        </div>
      `,
    });

    console.log("Email sent response:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
