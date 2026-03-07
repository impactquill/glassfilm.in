import { NextResponse } from 'next/server';

interface BookingData {
    name?: string;
    email?: string;
    phone?: string;
    city?: string;
    property?: string;
    requirements?: string | string[];
    message?: string;
}

export async function POST(req: Request) {
    try {
        const body: BookingData = await req.json();

        // Environment variables for Zoho IDs
        const orgId = process.env.ZOHO_ORG_ID;
        const formId = process.env.ZOHO_FORM_ID;
        const crmUrl = process.env.ZOHO_CRM_URL || 'https://crm.zoho.in/crm/WebToLeadForm';

        if (!orgId || !formId) {
            console.error('Missing ZOHO_ORG_ID or ZOHO_FORM_ID in environment variables.');
        }

        // Prepare the payload in URLSearchParams format (required by Zoho's Web-to-Lead endpoint)
        const zohoParams = new URLSearchParams();

        // Essential Zoho Fields
        zohoParams.append('xnQsjsdp', orgId || '');
        zohoParams.append('xmIwtLD', formId || '');
        zohoParams.append('actionType', 'TGVhZHM=');
        zohoParams.append('returnURL', 'https://glassfilm.in');

        // Lead Field Mapping
        const fullName = (body.name || 'Unknown').trim();
        const nameParts = fullName.split(' ');
        const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : '';
        const lastName = nameParts.length > 1 ? nameParts.slice(-1)[0] : fullName;

        zohoParams.append('First Name', firstName);
        zohoParams.append('Last Name', lastName);
        zohoParams.append('Email', body.email || '');
        zohoParams.append('Phone', body.phone || '');

        const requirementsString = Array.isArray(body.requirements)
            ? body.requirements.join(', ')
            : body.requirements || 'N/A';

        const description = [
            body.message ? `User Message: ${body.message}` : '',
            `City: ${body.city || 'N/A'}`,
            `Property Type: ${body.property || 'N/A'}`,
            `Requested Solutions: ${requirementsString}`,
            `Source: Website Booking Form`
        ].filter(Boolean).join('\n');

        zohoParams.append('Description', description);

        // Forward to Zoho (convert to string for maximum compatibility)
        const response = await fetch(crmUrl, {
            method: 'POST',
            body: zohoParams.toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Zoho Web-to-Lead usually returns a 302 redirect or a 200 with HTML, 
        // we just care if the request was sent successfully.
        if (response.ok) {
            return NextResponse.json({ success: true });
        } else {
            const errorText = await response.text();
            console.error('Zoho CRM Error Response:', errorText);
            return NextResponse.json({
                success: false,
                message: 'Failed to submit strictly to Zoho, but data was processed.'
            }, { status: 500 });
        }
    } catch (error: any) {
        console.error('Booking API Error:', error);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}
