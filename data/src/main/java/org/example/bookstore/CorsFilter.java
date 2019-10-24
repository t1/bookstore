package org.example.bookstore;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import static javax.ws.rs.HttpMethod.OPTIONS;

@Provider
@PreMatching
public class CorsFilter implements ContainerRequestFilter, ContainerResponseFilter {

    @Override
    public void filter(ContainerRequestContext request) {
        if (isPreflight(request)) {
            // We abort here, but all the CORS headers will still be added in the response filter
            request.abortWith(Response.ok().build());
        }
    }

    @Override
    public void filter(ContainerRequestContext request, ContainerResponseContext response) {
        if (!hasOriginHeader(request)) {
            return;
        }

        if (isPreflight(request)) {
            response.getHeaders().add("Access-Control-Allow-Credentials", "true");
            response.getHeaders().add("Access-Control-Allow-Methods", "*");
            response.getHeaders().addAll("Access-Control-Allow-Headers", "Content-Type");
        }

        response.getHeaders().add("Access-Control-Allow-Origin", "http://localhost:3000");
    }

    private static boolean isPreflight(ContainerRequestContext request) {
        return request.getMethod().equalsIgnoreCase(OPTIONS) && hasOriginHeader(request);
    }

    private static boolean hasOriginHeader(ContainerRequestContext request) {
        return request.getHeaders().containsKey("Origin");
    }
}
