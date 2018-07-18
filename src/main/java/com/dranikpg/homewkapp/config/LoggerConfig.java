package com.dranikpg.homewkapp.config;


import org.pmw.tinylog.Configurator;
import org.pmw.tinylog.Level;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LoggerConfig {

    @Value("${tinylog.file}")
    public String file;

    @Bean
    public Void logInit(){
        System.out.println("TINYLOG FILE   "  + file);
        Configurator.defaultConfig()
                .level(Level.DEBUG)
                .formatPattern("{{date:MM-dd HH:mm:ss} {level} {class_name}::{method} |min-size=40}: {message}")
                .activate();
        return null;
    }

}
