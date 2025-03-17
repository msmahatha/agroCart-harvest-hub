
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { Resend } from "https://esm.sh/resend@3.2.0";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface OrderDetails {
  items: OrderItem[];
  orderId: string;
  total: number;
  userEmail: string;
  userName: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }

    const resend = new Resend(RESEND_API_KEY);

    // Get request body
    const { items, orderId, total, userEmail, userName } = await req.json() as OrderDetails;

    if (!items || !orderId || !total || !userEmail) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: items, orderId, total, userEmail",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Sending order confirmation email to:", userEmail);

    // Generate items HTML for email
    const itemsHtml = items
      .map(
        (item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">
            ${item.name}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
            ${item.quantity}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
            ₹${item.price.toFixed(2)}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
            ₹${(item.price * item.quantity).toFixed(2)}
          </td>
        </tr>
      `
      )
      .join("");

    // Send email
    const { data, error } = await resend.emails.send({
      from: "AgroCart <orders@agrocart.com>",
      to: userEmail,
      subject: `Order Confirmation #${orderId}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #4CAF50; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Order Confirmation</h1>
          </div>
          
          <div style="padding: 20px; border: 1px solid #eee; background-color: #fff;">
            <p>Hello ${userName || "Valued Customer"},</p>
            
            <p>Thank you for your order! We're pleased to confirm that your order has been received and is being processed.</p>
            
            <div style="background-color: #f9f9f9; border: 1px solid #eee; padding: 15px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #4CAF50;">Order Summary</h2>
              <p><strong>Order Number:</strong> #${orderId}</p>
              
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #f5f5f5;">
                    <th style="padding: 10px; text-align: left; border-bottom: 2px solid #eee;">Product</th>
                    <th style="padding: 10px; text-align: center; border-bottom: 2px solid #eee;">Quantity</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 2px solid #eee;">Price</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 2px solid #eee;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold;">Order Total:</td>
                    <td style="padding: 10px; text-align: right; font-weight: bold;">₹${total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <p>If you have any questions or concerns about your order, please contact our customer service team.</p>
            
            <p>Thank you for shopping with AgroCart!</p>
          </div>
          
          <div style="padding: 20px; text-align: center; font-size: 12px; color: #777;">
            <p>© 2023 AgroCart. All rights reserved.</p>
            <p>This is an automated email, please do not reply.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Order confirmation email sent successfully" 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "An unexpected error occurred" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
