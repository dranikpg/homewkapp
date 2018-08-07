package com.dranikpg.homewkapp.util;

import java.io.File;

public class Util {

    public static File get(String name){
        return new File(Thread.currentThread().getContextClassLoader().getResource(name).getFile());
    }

    public static String fixed(String string, int length) {
        return String.format("%1$"+length+ "s", string);
    }


}
