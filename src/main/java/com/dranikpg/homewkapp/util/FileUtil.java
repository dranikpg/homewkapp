package com.dranikpg.homewkapp.util;

import java.io.File;

public class FileUtil {

    public static File get(String name){
        return new File(Thread.currentThread().getContextClassLoader().getResource(name).getFile());
    }

}
