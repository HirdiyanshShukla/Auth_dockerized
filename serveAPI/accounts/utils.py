from django.core.mail import EmailMessage


class EmailSender:

    @staticmethod
    def send_email(data):
        email = EmailMessage(
            subject=data['subject'], 
            body=data['body'], 
            to=data['to_email'])
        
        email.send()