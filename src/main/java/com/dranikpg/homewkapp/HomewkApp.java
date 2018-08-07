package com.dranikpg.homewkapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

@SpringBootApplication
@PropertySources({
        @PropertySource(value={"classpath:hw.properties"}),
        @PropertySource(value={"file:/var/lib/tomcat8/conf/hw.properties"},ignoreResourceNotFound = true)})
public class HomewkApp extends SpringBootServletInitializer {

	public static void main(String[] args) {

        System.setProperty("spring.config.name", "hw");
		SpringApplication.run(HomewkApp.class, args);
	}

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(HomewkApp.class).properties("spring.config.name: hw");
    }


}
