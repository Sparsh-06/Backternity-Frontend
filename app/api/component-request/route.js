import { Resend } from 'resend';

// Initialize Resend with fallback for build time
const resend = new Resend(process.env.RESEND_API_KEY || 'fallback_key_for_build');

export async function POST(request) {
  try {
    // Check if API key is properly configured at runtime
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'fallback_key_for_build') {
      return Response.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { name, email, componentName, description, useCase, priority } = body;

    // Validate required fields
    if (!name || !email || !componentName || !description) {
      return Response.json(
        { error: "Missing required fields: name, email, componentName, and description are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Create HTML email template for component request
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Component Request</title>
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h1 style="color: #333; margin-bottom: 20px;">🛠️ New Component Request</h1>
            
            <div style="background-color: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h2 style="color: #10b981; margin-bottom: 15px; font-size: 18px;">Requester Details</h2>
              <p style="margin: 10px 0; color: #333;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0; color: #333;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0; color: #333;"><strong>Priority:</strong> <span style="background-color: ${priority === 'High' ? '#fef2f2' : priority === 'Medium' ? '#fef7ed' : '#f0fdf4'}; color: ${priority === 'High' ? '#dc2626' : priority === 'Medium' ? '#ea580c' : '#16a34a'}; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${priority || 'Medium'}</span></p>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h2 style="color: #10b981; margin-bottom: 15px; font-size: 18px;">Component Request</h2>
              <p style="margin: 10px 0; color: #333;"><strong>Component Name:</strong> ${componentName}</p>
              
              <h3 style="color: #333; margin-top: 20px; margin-bottom: 10px; font-size: 16px;">Description</h3>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; border-left: 4px solid #10b981; color: #333; line-height: 1.6;">
                ${description.replace(/\n/g, '<br>')}
              </div>
              
              ${useCase ? `
                <h3 style="color: #333; margin-top: 20px; margin-bottom: 10px; font-size: 16px;">Use Case</h3>
                <div style="background-color: #f1f5f9; padding: 15px; border-radius: 4px; border-left: 4px solid #3b82f6; color: #333; line-height: 1.6;">
                  ${useCase.replace(/\n/g, '<br>')}
                </div>
              ` : ''}
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #e6fffa; border-radius: 6px;">
              <p style="margin: 0; font-size: 14px; color: #0d9488;">
                This component request was submitted through the Backternity website.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Backternity Components <team@backternity.dev>',
      to: ['sparshsharmadav@gmail.com'],
      subject: `🛠️ Component Request: ${componentName} (Priority: ${priority || 'Medium'})`,
      html: htmlContent,
      replyTo: email,   
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error: 'Failed to send component request' }, { status: 500 });
    }

    // Log the request for additional tracking
    console.log("Component Request Submitted:", {
      name,
      email,
      componentName,
      description,
      useCase: useCase || "Not specified",
      priority: priority || "Medium",
      timestamp: new Date().toISOString(),
    });

    return Response.json(
      { 
        success: true,
        message: "Component request submitted successfully! We'll review it and get back to you soon.",
        id: `req_${Date.now()}`, // Generate a simple request ID
        data 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Component request error:", error);
    return Response.json(
      { error: "Failed to submit component request. Please try again." },
      { status: 500 }
    );
  }
}