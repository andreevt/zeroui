package com.hsbc.eep.zeroui;

import org.glassfish.grizzly.http.server.CLStaticHttpHandler;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import java.io.IOException;
import java.net.URI;

public class Main {

    private static final String BASE_URI = "http://localhost:8080/webapp";
    private HttpServer server;

    public static void main(String[] args) {
        new Main().startServer();
        try {
            Thread.sleep(Long.MAX_VALUE);
        } catch (InterruptedException e) {
            e.printStackTrace();
            System.exit(1);
        }
    }

    private void startServer() {
        try {
            final ResourceConfig rc = new ResourceConfig().packages("com.hsbc.eep.zeroui");
            server = GrizzlyHttpServerFactory.createHttpServer(URI.create(BASE_URI), rc, true);
            CLStaticHttpHandler clStaticHttpHandler = new CLStaticHttpHandler(HttpServer.class.getClassLoader(), "webapp/");
            clStaticHttpHandler.setFileCacheEnabled(false);
            System.out.printf("Starting server");
            server.getServerConfiguration().addHttpHandler(clStaticHttpHandler, "/");

            server.start();
        } catch (IOException e) {
            server.shutdown();
            System.exit(1);
        }
    }

}
