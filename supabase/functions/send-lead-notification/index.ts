import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LeadNotificationRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  source?: string;
  leadId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message, source, leadId }: LeadNotificationRequest = await req.json();

    console.log("📧 Sending lead notification for:", { name, email, leadId });

    // Admin email - should be configurable via settings table
    const adminEmail = "admin@devmart.sr"; // TODO: Fetch from settings table

    const emailResponse = await resend.emails.send({
      from: "Devmart Digtek Pro <onboarding@resend.dev>",
      to: [adminEmail],
      subject: "🎯 New Lead from Devmart Website",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #6A47ED 0%, #C6F806 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Lead Received! 🎯</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #6A47ED; margin-top: 0;">Contact Information</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #6A47ED;">${email}</a></p>
              ${phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #6A47ED;">${phone}</a></p>` : ''}
              ${subject ? `<p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>` : ''}
              ${source ? `<p style="margin: 10px 0;"><strong>Source:</strong> <span style="background: #6A47ED; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">${source}</span></p>` : ''}
            </div>

            <h2 style="color: #6A47ED;">Message</h2>
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="white-space: pre-wrap; line-height: 1.6; color: #333;">${message}</p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="https://ujevbkwzywuuslmsckzh.supabase.co/admin/leads" 
                 style="background: #6A47ED; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">
                View in Admin Dashboard →
              </a>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
              <p>This notification was sent automatically from your Devmart Digtek Pro website.</p>
              <p style="margin-top: 8px;">Lead ID: ${leadId}</p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("✅ Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("❌ Error in send-lead-notification function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
