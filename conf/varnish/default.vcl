#
# This is an example VCL file for Varnish.
#
# It does not do anything by default, delegating control to the
# builtin VCL. The builtin VCL is called when there is no explicit
# return statement.
#
# See the VCL chapters in the Users Guide at https://www.varnish-cache.org/docs/
# and https://www.varnish-cache.org/trac/wiki/VCLExamples for more examples.

# Marker to tell the VCL compiler that this VCL has been adapted to the
# new 4.0 format.
vcl 4.0;

import std;

# Default backend definition. Set this to point to your content server.
backend default {
    .host = "127.0.0.1";
    .port = "9292";
    .first_byte_timeout = 1.8s;
}

sub vcl_recv {
    # Happens before we check if we have this in cache already.
    #
    # Typically you clean up the request here, removing cookies you don't need,
    # rewriting the request, etc.
    if (req.url ~ "^/initialize") {
       ban("obj.http.url ~ ^/api/audience/dashboard");
    }
}

sub vcl_backend_response {
    # Happens after we have read the response headers from the backend.
    #
    # Here you clean the response headers, removing silly Set-Cookie headers
    # and other mistakes your backend does.

    if (bereq.url ~ "^/api/audience/dashboard") {
        set beresp.grace = 1s;
        if (beresp.http.X-Dashboard-Freezed-Until) {
            set beresp.ttl = std.time(beresp.http.X-Dashboard-Freezed-Until, now) - now;
        } else {
            set beresp.ttl = 1s;
        }
        set beresp.http.Cache-Control = "public, max-age=" + std.integer(beresp.ttl);
    }
}

sub vcl_deliver {
    # Happens when we have all the pieces we need, and are about to send the
    # response to the client.
    #
    # You can do accounting or modifying the final object here.
}
