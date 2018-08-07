package com.dranikpg.homewkapp.config;


import org.pmw.tinylog.Configurator;
import org.pmw.tinylog.Level;
import org.pmw.tinylog.Logger;
import org.pmw.tinylog.writers.FileWriter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LoggerConfig {

    @Value("${tinylog.file}")
    public String file;

    @Value("${tinylog.buffer}")
    public boolean buffer = false;

    @Bean
    public Void logInit(){
        System.out.println("LOGGER CONFIG");
        Configurator.defaultConfig()
                .level(Level.DEBUG)
                .addWriter(new FileWriter(file, buffer,true))
                .formatPattern("{{date:MM-dd HH:mm:ss} {level} {class_name}::{method} |min-size=40}: {message}")
                .activate();
        Logger.debug("START!");
        return null;
    }

}
