import nodemailer from "nodemailer";

const createTransporter = () => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

// ── Shared layout wrapper ────────────────────────────────────────────────────
const emailWrapper = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
</head>
<body style="margin:0;padding:0;background:#F0F2F5;font-family:'Segoe UI',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F0F2F5;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.10);">

        <!-- TOP BRAND BAR -->
        <tr>
          <td style="background:linear-gradient(135deg,#C4122F 0%,#9B0E24 100%);padding:0 0 0 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:32px 40px 28px 40px;">
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background:rgba(255,255,255,0.15);border-radius:12px;padding:10px 16px;">
                        <span style="color:#fff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">🎓 Best IELTS BD</span>
                      </td>
                    </tr>
                  </table>
                  <p style="color:rgba(255,255,255,0.75);font-size:13px;margin:10px 0 0 4px;letter-spacing:0.5px;">OFFICIAL COMMUNICATION · bestieltsbd.vercel.app</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CONTENT -->
        ${content}

        <!-- FOOTER -->
        <tr>
          <td style="background:#1A1D23;padding:32px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="color:#6B7280;font-size:13px;margin:0 0 8px 0;">
                    🎓 <strong style="color:#9CA3AF;">Best IELTS BD</strong> · World-Class IELTS Preparation
                  </p>
                  <p style="color:#4B5563;font-size:12px;margin:0 0 4px 0;">📧 support@bestieltsbd.com &nbsp;|&nbsp; 🌐 bestieltsbd.vercel.app</p>
                  <p style="color:#374151;font-size:11px;margin:16px 0 0 0;border-top:1px solid #2D3139;padding-top:14px;">
                    © ${new Date().getFullYear()} Best IELTS BD. All rights reserved. &nbsp;·&nbsp;
                    <span style="color:#C4122F;">Do not reply to this email.</span>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`;

// ── Template 1: Welcome Email (on registration) ──────────────────────────────
const getWelcomeTemplate = (data: {
    name: string;
    email: string;
    loginUrl: string;
}) => emailWrapper(`
  <!-- HERO -->
  <tr>
    <td style="background:linear-gradient(180deg,#FFF5F7 0%,#ffffff 100%);padding:48px 40px 32px 40px;text-align:center;border-bottom:1px solid #FDE8EC;">
      <div style="width:72px;height:72px;background:linear-gradient(135deg,#C4122F,#9B0E24);border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:32px;line-height:72px;">🎓</div>
      <h1 style="color:#111827;font-size:28px;font-weight:800;margin:0 0 10px 0;line-height:1.2;">Welcome to Best IELTS BD!</h1>
      <p style="color:#6B7280;font-size:15px;margin:0;line-height:1.6;">Your account has been created successfully.</p>
    </td>
  </tr>

  <!-- GREETING -->
  <tr>
    <td style="padding:36px 40px 24px 40px;">
      <p style="color:#374151;font-size:16px;line-height:1.7;margin:0 0 16px 0;">
        Hi <strong style="color:#C4122F;">${data.name}</strong>, 👋
      </p>
      <p style="color:#4B5563;font-size:15px;line-height:1.7;margin:0 0 24px 0;">
        We're thrilled to have you on board! You now have access to Bangladesh's most advanced AI-powered IELTS mock test platform. Start your journey towards your target band score today.
      </p>

      <!-- Account info box -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFB;border:1.5px solid #E5E7EB;border-radius:14px;margin-bottom:28px;">
        <tr>
          <td style="padding:24px 28px;">
            <p style="color:#6B7280;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin:0 0 16px 0;">Your Account</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #F3F4F6;">
                  <span style="color:#9CA3AF;font-size:13px;">Registered Email</span>
                </td>
                <td style="padding:8px 0;border-bottom:1px solid #F3F4F6;text-align:right;">
                  <span style="color:#111827;font-size:13px;font-weight:600;">${data.email}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;">
                  <span style="color:#9CA3AF;font-size:13px;">Account Type</span>
                </td>
                <td style="padding:8px 0;text-align:right;">
                  <span style="background:#FDE8EC;color:#C4122F;font-size:12px;font-weight:700;padding:3px 10px;border-radius:20px;">Student</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- What's next -->
      <p style="color:#374151;font-size:14px;font-weight:700;margin:0 0 14px 0;text-transform:uppercase;letter-spacing:0.5px;">What you can do now:</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${[
            ["🛒", "Browse & buy IELTS mock test packages"],
            ["🎧", "Practice Listening, Reading & Writing"],
            ["🎤", "Take AI-graded Speaking tests"],
            ["📊", "Track your band score progress"],
        ].map(([icon, text]) => `
        <tr>
          <td style="padding:7px 0;">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:28px;font-size:18px;vertical-align:top;">${icon}</td>
                <td style="color:#4B5563;font-size:14px;line-height:1.5;padding-left:6px;">${text}</td>
              </tr>
            </table>
          </td>
        </tr>`).join("")}
      </table>
    </td>
  </tr>

  <!-- CTA BUTTON -->
  <tr>
    <td style="padding:8px 40px 40px 40px;text-align:center;">
      <a href="${data.loginUrl}" style="display:inline-block;background:linear-gradient(135deg,#C4122F,#9B0E24);color:#ffffff;text-decoration:none;padding:16px 48px;border-radius:10px;font-size:16px;font-weight:700;letter-spacing:0.3px;box-shadow:0 6px 20px rgba(196,18,47,0.35);">
        🚀 &nbsp;Go to Dashboard
      </a>
      <p style="color:#9CA3AF;font-size:12px;margin:16px 0 0 0;">Button not working? <a href="${data.loginUrl}" style="color:#C4122F;">${data.loginUrl}</a></p>
    </td>
  </tr>

  <!-- SECURITY NOTE -->
  <tr>
    <td style="padding:0 40px 36px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:10px;">
        <tr>
          <td style="padding:16px 20px;">
            <p style="color:#92400E;font-size:13px;margin:0;line-height:1.6;">
              ⚠️ <strong>Security Tip:</strong> Best IELTS BD will never ask for your password via email or phone. If you did not create this account, please ignore this email.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
`);

// ── Template 2: IELTS Exam Registration (admin-created student) ──────────────
const getStudentRegistrationTemplate = (data: {
    studentName: string;
    examId: string;
    email: string;
    password: string;
    examDate: string;
    loginUrl: string;
}) => emailWrapper(`
  <!-- HERO -->
  <tr>
    <td style="background:linear-gradient(180deg,#FFF5F7 0%,#ffffff 100%);padding:48px 40px 32px 40px;text-align:center;border-bottom:1px solid #FDE8EC;">
      <div style="font-size:52px;margin-bottom:16px;">🎓</div>
      <h1 style="color:#111827;font-size:26px;font-weight:800;margin:0 0 8px 0;">IELTS Exam Registration</h1>
      <p style="color:#6B7280;font-size:14px;margin:0;">You are now registered for your upcoming IELTS Mock Test.</p>
    </td>
  </tr>

  <!-- BODY -->
  <tr>
    <td style="padding:36px 40px 24px 40px;">
      <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 28px 0;">
        Dear <strong style="color:#C4122F;">${data.studentName}</strong>, your IELTS mock test registration is confirmed. Please save your login credentials below — you will need them on exam day.
      </p>

      <!-- Credentials Card -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#FFF5F7 0%,#FDE8EC 100%);border:2px solid #C4122F;border-radius:16px;margin-bottom:28px;">
        <tr>
          <td style="padding:28px 32px;">
            <p style="color:#9B0E24;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 20px 0;border-bottom:1px solid rgba(196,18,47,0.15);padding-bottom:14px;">🔐 Your Login Credentials</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(196,18,47,0.08);width:120px;">
                  <span style="color:#6B7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Exam ID</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(196,18,47,0.08);text-align:right;">
                  <code style="background:#ffffff;color:#C4122F;font-size:18px;font-weight:800;padding:4px 14px;border-radius:8px;border:1px solid #FDE8EC;letter-spacing:1px;">${data.examId}</code>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(196,18,47,0.08);">
                  <span style="color:#6B7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Email</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(196,18,47,0.08);text-align:right;">
                  <span style="color:#374151;font-size:14px;font-weight:600;">${data.email}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(196,18,47,0.08);">
                  <span style="color:#6B7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Password</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(196,18,47,0.08);text-align:right;">
                  <code style="background:#ffffff;color:#374151;font-size:14px;font-weight:700;padding:4px 14px;border-radius:8px;border:1px solid #E5E7EB;">${data.password}</code>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;">
                  <span style="color:#6B7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Exam Date</span>
                </td>
                <td style="padding:10px 0;text-align:right;">
                  <span style="background:#EF4444;color:#ffffff;font-size:13px;font-weight:700;padding:4px 14px;border-radius:8px;">📅 ${data.examDate}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Tips -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0FDF4;border:1px solid #86EFAC;border-radius:12px;margin-bottom:24px;">
        <tr>
          <td style="padding:20px 24px;">
            <p style="color:#166534;font-size:14px;font-weight:700;margin:0 0 10px 0;">📋 Before Your Exam:</p>
            <ul style="color:#166534;font-size:13px;margin:0;padding-left:18px;line-height:1.8;">
              <li>Use a stable internet connection and a laptop/desktop</li>
              <li>The exam runs in fullscreen mode — do not exit during the test</li>
              <li>Keep your Exam ID handy — you'll need it to start</li>
            </ul>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- CTA -->
  <tr>
    <td style="padding:0 40px 40px 40px;text-align:center;">
      <a href="${data.loginUrl}" style="display:inline-block;background:linear-gradient(135deg,#C4122F,#9B0E24);color:#ffffff;text-decoration:none;padding:16px 48px;border-radius:10px;font-size:16px;font-weight:700;box-shadow:0 6px 20px rgba(196,18,47,0.35);">
        🚀 &nbsp;Login to Exam Portal
      </a>
    </td>
  </tr>

  <!-- WARNING -->
  <tr>
    <td style="padding:0 40px 36px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:10px;">
        <tr><td style="padding:16px 20px;">
          <p style="color:#92400E;font-size:13px;margin:0;line-height:1.6;">⚠️ <strong>Important:</strong> Do not share your login credentials with anyone. During the exam, switching tabs or exiting fullscreen may result in automatic termination.</p>
        </td></tr>
      </table>
    </td>
  </tr>
`);

// ── Template 3: Result Published ─────────────────────────────────────────────
const getResultPublishedTemplate = (data: {
    studentName: string;
    examId: string;
    listeningBand: number;
    readingBand: number;
    writingBand: number;
    speakingBand: number;
    overallBand: number;
    examDate: string;
    resultUrl: string;
}) => {
    const bandColor = (b: number) => b >= 7 ? "#059669" : b >= 5 ? "#0891b2" : "#DC2626";
    const bandLabel = (b: number) => b >= 7 ? "Excellent" : b >= 5 ? "Good" : "Needs Work";

    return emailWrapper(`
  <!-- HERO -->
  <tr>
    <td style="background:linear-gradient(135deg,#ECFDF5 0%,#D1FAE5 100%);padding:48px 40px 36px 40px;text-align:center;border-bottom:1px solid #A7F3D0;">
      <div style="font-size:56px;margin-bottom:12px;">🏆</div>
      <h1 style="color:#065F46;font-size:26px;font-weight:800;margin:0 0 8px 0;">Your Results Are Ready!</h1>
      <p style="color:#6EE7B7;font-size:14px;margin:0;">Best IELTS BD · ${data.examDate}</p>
    </td>
  </tr>

  <!-- OVERALL SCORE -->
  <tr>
    <td style="padding:36px 40px 8px 40px;text-align:center;">
      <p style="color:#374151;font-size:15px;margin:0 0 20px 0;">Congratulations, <strong style="color:#C4122F;">${data.studentName}</strong>! Here's how you performed:</p>
      <table cellpadding="0" cellspacing="0" style="margin:0 auto;background:linear-gradient(135deg,${bandColor(data.overallBand)},${bandColor(data.overallBand)}AA);border-radius:100px;padding:28px 48px;box-shadow:0 12px 32px rgba(0,0,0,0.12);">
        <tr>
          <td style="text-align:center;">
            <p style="color:rgba(255,255,255,0.85);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 4px 0;">Overall Band</p>
            <p style="color:#ffffff;font-size:64px;font-weight:900;margin:0;line-height:1;">${data.overallBand}</p>
            <p style="color:rgba(255,255,255,0.75);font-size:13px;font-weight:600;margin:4px 0 0 0;">${bandLabel(data.overallBand)}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- MODULE SCORES -->
  <tr>
    <td style="padding:28px 40px;">
      <table width="100%" cellpadding="8" cellspacing="0">
        <tr>
          ${[
              { label: "🎧 Listening", band: data.listeningBand, bg: "#EFF6FF", border: "#BFDBFE" },
              { label: "📖 Reading",   band: data.readingBand,   bg: "#ECFDF5", border: "#A7F3D0" },
              { label: "✍️ Writing",   band: data.writingBand,   bg: "#F5F3FF", border: "#DDD6FE" },
              { label: "🎤 Speaking",  band: data.speakingBand,  bg: "#FFF7ED", border: "#FED7AA" },
          ].map(m => `
          <td width="25%" style="text-align:center;padding:0 6px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:${m.bg};border:1.5px solid ${m.border};border-radius:14px;">
              <tr><td style="padding:18px 8px;text-align:center;">
                <p style="font-size:12px;font-weight:700;color:#4B5563;margin:0 0 8px 0;">${m.label}</p>
                <p style="font-size:36px;font-weight:900;color:${bandColor(m.band)};margin:0;line-height:1;">${m.band || "—"}</p>
              </td></tr>
            </table>
          </td>`).join("")}
        </tr>
      </table>
    </td>
  </tr>

  <!-- CTA -->
  <tr>
    <td style="padding:8px 40px 40px 40px;text-align:center;">
      <a href="${data.resultUrl}" style="display:inline-block;background:linear-gradient(135deg,#C4122F,#9B0E24);color:#ffffff;text-decoration:none;padding:16px 48px;border-radius:10px;font-size:16px;font-weight:700;box-shadow:0 6px 20px rgba(196,18,47,0.35);">
        📊 &nbsp;View Full Report
      </a>
      <p style="color:#9CA3AF;font-size:12px;margin:16px 0 0 0;">Exam ID: <strong>${data.examId}</strong></p>
    </td>
  </tr>

  <!-- ENCOURAGEMENT -->
  <tr>
    <td style="padding:0 40px 36px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFB;border:1px solid #E5E7EB;border-radius:12px;">
        <tr><td style="padding:20px 24px;text-align:center;">
          <p style="color:#4B5563;font-size:14px;line-height:1.7;margin:0;">
            Thank you for choosing <strong>Best IELTS BD</strong> for your preparation. Keep practicing — your target band is within reach! 🌟
          </p>
        </td></tr>
      </table>
    </td>
  </tr>
`);
};

// ── Template 4: Password Reset OTP ───────────────────────────────────────────
const getPasswordResetTemplate = (data: {
    name: string;
    otp: string;
    expiresInMinutes: number;
}) => emailWrapper(`
  <!-- HERO -->
  <tr>
    <td style="background:linear-gradient(180deg,#FFF5F7 0%,#ffffff 100%);padding:48px 40px 32px 40px;text-align:center;border-bottom:1px solid #FDE8EC;">
      <div style="width:72px;height:72px;background:linear-gradient(135deg,#C4122F,#9B0E24);border-radius:50%;margin:0 auto 20px;font-size:32px;line-height:72px;text-align:center;">🔐</div>
      <h1 style="color:#111827;font-size:24px;font-weight:800;margin:0 0 8px 0;">Password Reset Request</h1>
      <p style="color:#6B7280;font-size:14px;margin:0;">Use the code below to reset your password.</p>
    </td>
  </tr>

  <!-- BODY -->
  <tr>
    <td style="padding:36px 40px 24px 40px;">
      <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 28px 0;">
        Hi <strong style="color:#C4122F;">${data.name}</strong>, we received a request to reset your <strong>Best IELTS BD</strong> account password. Use the one-time code below:
      </p>

      <!-- OTP Box -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#FFF5F7 0%,#FDE8EC 100%);border:2px dashed #C4122F;border-radius:16px;margin-bottom:28px;">
        <tr>
          <td style="padding:32px;text-align:center;">
            <p style="color:#9B0E24;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:2px;margin:0 0 16px 0;">Your Verification Code</p>
            <p style="color:#C4122F;font-size:52px;font-weight:900;letter-spacing:14px;margin:0;font-family:'Courier New',monospace;">${data.otp}</p>
            <p style="color:#9CA3AF;font-size:12px;margin:14px 0 0 0;">⏱ Expires in <strong style="color:#C4122F;">${data.expiresInMinutes} minutes</strong></p>
          </td>
        </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="background:#FEF2F2;border:1px solid #FECACA;border-radius:12px;">
        <tr><td style="padding:18px 22px;">
          <p style="color:#991B1B;font-size:13px;margin:0;line-height:1.6;">
            🚫 <strong>Never share this code.</strong> Best IELTS BD staff will <em>never</em> ask for your OTP. If you didn't request this, you can safely ignore this email — your password won't change.
          </p>
        </td></tr>
      </table>
    </td>
  </tr>

  <tr><td style="padding:0 40px 40px 40px;text-align:center;">
    <p style="color:#9CA3AF;font-size:12px;margin:0;">This code is valid for ${data.expiresInMinutes} minutes only.</p>
  </td></tr>
`);

// ── Exported send functions ────────────────────────────────────────────────────

// Welcome email on self-registration
export const sendWelcomeEmail = async (data: {
    name: string;
    email: string;
}) => {
    try {
        const transporter = createTransporter();
        const loginUrl = `${process.env.FRONTEND_URL || "https://bestieltsbd.vercel.app"}/login`;
        await transporter.sendMail({
            from: `"Best IELTS BD" <${process.env.EMAIL_USER}>`,
            to: data.email,
            subject: `👋 Welcome to Best IELTS BD, ${data.name}!`,
            html: getWelcomeTemplate({ name: data.name, email: data.email, loginUrl }),
        });
        console.log("Welcome email sent:", data.email);
        return { success: true };
    } catch (error) {
        console.error("Failed to send welcome email:", error);
        return { success: false, error };
    }
};

// Admin-registered student exam credentials
export const sendStudentRegistrationEmail = async (data: {
    studentName: string;
    examId: string;
    email: string;
    password: string;
    examDate: Date;
}) => {
    try {
        const transporter = createTransporter();
        const loginUrl = `${process.env.FRONTEND_URL || "https://bestieltsbd.vercel.app"}/login`;
        await transporter.sendMail({
            from: `"Best IELTS BD" <${process.env.EMAIL_USER}>`,
            to: data.email,
            subject: `🎓 IELTS Exam Registration Confirmed — ${data.examId}`,
            html: getStudentRegistrationTemplate({
                studentName: data.studentName,
                examId: data.examId,
                email: data.email,
                password: data.password,
                examDate: new Date(data.examDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
                loginUrl: `${loginUrl}`,
            }),
        });
        console.log("Registration email sent:", data.email);
        return { success: true };
    } catch (error) {
        console.error("Failed to send registration email:", error);
        return { success: false, error };
    }
};

// Result published
export const sendResultPublishedEmail = async (data: {
    studentName: string;
    examId: string;
    email: string;
    listeningBand: number;
    readingBand: number;
    writingBand: number;
    speakingBand: number;
    overallBand: number;
    examDate: Date;
}) => {
    try {
        const transporter = createTransporter();
        const resultUrl = `${process.env.FRONTEND_URL || "https://bestieltsbd.vercel.app"}/dashboard/student/results`;
        await transporter.sendMail({
            from: `"Best IELTS BD" <${process.env.EMAIL_USER}>`,
            to: data.email,
            subject: `🏆 Your IELTS Result is Ready! — Overall Band ${data.overallBand}`,
            html: getResultPublishedTemplate({
                studentName: data.studentName,
                examId: data.examId,
                listeningBand: data.listeningBand,
                readingBand: data.readingBand,
                writingBand: data.writingBand,
                speakingBand: data.speakingBand,
                overallBand: data.overallBand,
                examDate: new Date(data.examDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
                resultUrl,
            }),
        });
        console.log("Result email sent:", data.email);
        return { success: true };
    } catch (error) {
        console.error("Failed to send result email:", error);
        return { success: false, error };
    }
};

// Password reset OTP
export const sendPasswordResetEmail = async (data: {
    name: string;
    email: string;
    otp: string;
    expiresInMinutes?: number;
}) => {
    try {
        const transporter = createTransporter();
        await transporter.sendMail({
            from: `"Best IELTS BD" <${process.env.EMAIL_USER}>`,
            to: data.email,
            subject: `🔐 Your Password Reset Code — ${data.otp}`,
            html: getPasswordResetTemplate({
                name: data.name,
                otp: data.otp,
                expiresInMinutes: data.expiresInMinutes || 10,
            }),
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to send OTP email:", error);
        return { success: false, error };
    }
};

// Combined export
export const EmailService = {
    sendWelcomeEmail,
    sendStudentRegistrationEmail,
    sendResultPublishedEmail,
    sendPasswordResetEmail,
};
