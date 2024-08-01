import logging
import json
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger(__name__)

class RequestResponseLoggingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        logger.info(f"Received {request.method} request to {request.get_full_path()}")
        logger.debug(f"Request body: {request.body}")

    def process_response(self, request, response):
        logger.info(f"Returning {response.status_code} response")
        logger.debug(f"Response content: {response.content}")
        return response