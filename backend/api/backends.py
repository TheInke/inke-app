import ssl
from django.core.mail.backends.smtp import EmailBackend

class NonsecureEmailBackend(EmailBackend):
    def _get_connection(self):
        connection = super()._get_connection()
        connection.starttls(context=ssl._create_unverified_context())
        return connection
