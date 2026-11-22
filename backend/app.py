import os
import sqlite3
import smtplib
import json
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load environment variables
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

app = Flask(__name__)
CORS(app)

# ===== Database Setup =====
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'devis.db')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS devis_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            email TEXT NOT NULL,
            telephone TEXT,
            entreprise TEXT,
            message TEXT NOT NULL,
            produit TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# ===== Email Configuration =====
SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
SMTP_USERNAME = os.getenv('SMTP_USERNAME', '')
SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', '')
NOTIFICATION_EMAILS = ['elmazzouznet@gmail.com', 'order@isolmaroc.com']


def send_notification_email(data):
    """Send email notification to Isolmaroc team."""
    if not SMTP_USERNAME or not SMTP_PASSWORD:
        print("[WARNING] SMTP credentials not configured. Email not sent.")
        return False

    try:
        subject = f"Nouvelle demande de devis - {data.get('produit', 'Produit non spécifié')}"

        html_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #0047AB, #003380); padding: 20px; border-radius: 8px 8px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 22px;">Nouvelle Demande de Devis</h1>
                </div>
                <div style="background: #f9f9f9; padding: 24px; border: 1px solid #eee; border-radius: 0 0 8px 8px;">
                    <h2 style="color: #0047AB; font-size: 18px; margin-top: 0;">Informations du demandeur</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="padding: 8px 0; font-weight: bold; width: 130px;">Nom :</td><td>{data.get('nom', '-')}</td></tr>
                        <tr><td style="padding: 8px 0; font-weight: bold;">Email :</td><td><a href="mailto:{data.get('email', '')}">{data.get('email', '-')}</a></td></tr>
                        <tr><td style="padding: 8px 0; font-weight: bold;">Téléphone :</td><td>{data.get('telephone', '-') or '-'}</td></tr>
                        <tr><td style="padding: 8px 0; font-weight: bold;">Entreprise :</td><td>{data.get('entreprise', '-') or '-'}</td></tr>
                        <tr><td style="padding: 8px 0; font-weight: bold;">Produit :</td><td style="color: #0047AB; font-weight: bold;">{data.get('produit', '-') or '-'}</td></tr>
                    </table>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;">
                    <h3 style="color: #333; font-size: 15px;">Message :</h3>
                    <p style="background: white; padding: 16px; border-radius: 6px; border: 1px solid #eee;">{data.get('message', '-')}</p>
                    <p style="color: #999; font-size: 12px; margin-top: 20px;">Reçu le {datetime.now().strftime('%d/%m/%Y à %H:%M')}</p>
                </div>
            </div>
        </body>
        </html>
        """

        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = SMTP_USERNAME
        msg['To'] = ', '.join(NOTIFICATION_EMAILS)
        msg.attach(MIMEText(html_body, 'html'))

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.sendmail(SMTP_USERNAME, NOTIFICATION_EMAILS, msg.as_string())

        print(f"[OK] Email notification sent to {NOTIFICATION_EMAILS}")
        return True

    except Exception as e:
        print(f"[ERROR] Failed to send email: {e}")
        return False


# ===== API Routes =====

@app.route('/submit-devis', methods=['POST'])
def submit_devis():
    """Receive and process a quote request."""
    try:
        data = request.get_json()

        if not data:
            return jsonify({'success': False, 'message': 'Données invalides.'}), 400

        # Validation
        nom = (data.get('nom') or '').strip()
        email = (data.get('email') or '').strip()
        message = (data.get('message') or '').strip()
        telephone = (data.get('telephone') or '').strip()
        entreprise = (data.get('entreprise') or '').strip()
        produit = (data.get('produit') or '').strip()

        errors = []
        if not nom:
            errors.append('Le nom est obligatoire.')
        if not email or '@' not in email:
            errors.append('Un email valide est obligatoire.')
        if not message:
            errors.append('Le message est obligatoire.')

        if errors:
            return jsonify({'success': False, 'message': ' '.join(errors)}), 400

        # Store in database
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO devis_requests (nom, email, telephone, entreprise, message, produit) VALUES (?, ?, ?, ?, ?, ?)',
            (nom, email, telephone, entreprise, message, produit)
        )
        conn.commit()
        request_id = cursor.lastrowid
        conn.close()

        print(f"[OK] Devis #{request_id} stored: {nom} ({email}) - {produit}")

        # Send email notification (non-blocking for response)
        send_notification_email(data)

        return jsonify({
            'success': True,
            'message': 'Votre demande de devis a été envoyée avec succès.'
        }), 200

    except Exception as e:
        print(f"[ERROR] {e}")
        return jsonify({'success': False, 'message': 'Erreur serveur. Veuillez réessayer.'}), 500


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({'status': 'ok', 'timestamp': datetime.now().isoformat()})


if __name__ == '__main__':
    print("="*50)
    print("  Isolmaroc Devis API - Running on port 5000")
    print("="*50)
    app.run(debug=True, host='0.0.0.0', port=5000)
