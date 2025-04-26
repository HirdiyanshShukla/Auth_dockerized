from rest_framework.renderers import JSONRenderer
import json

class CustomJSONRenderer(JSONRenderer):
    
    def render(self, data, accept_media_type=None, renderer_context=None):
        
        response = {
            "success": True,
            "data": data,
            "message": "Request was successful"
        }
        
        # If there is an error, set success to False and include the error message.. error is coaught on the basis of status code
        if renderer_context and renderer_context.get('response') and renderer_context['response'].status_code not in [200, 201]:
            response['success'] = False
            response['message'] = "An error occurred"
        
        # return json.dumps(response, ensure_ascii=False)
        return super().render(response, accept_media_type, renderer_context)
