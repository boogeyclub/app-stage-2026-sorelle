package cm.odigital.serviceconnectmarket.auth.api;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class ApiRequestLoggingFilter extends OncePerRequestFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(ApiRequestLoggingFilter.class);

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return !request.getRequestURI().startsWith(request.getContextPath() + "/api/");
    }

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        long startedAt = System.nanoTime();

        try {
            filterChain.doFilter(request, response);
        } finally {
            long elapsedMilliseconds = TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - startedAt);
            // Do not log request bodies, headers, or query strings: they can contain passwords and confirmation tokens.
            LOGGER.info(
                "API {} {} -> {} ({} ms)",
                request.getMethod(),
                request.getRequestURI(),
                response.getStatus(),
                elapsedMilliseconds
            );
        }
    }
}
