package com.dranikpg.homewkapp.util.tag;

public class Tags {
    public static final int TAG_HOMEWORK      = 0;
    public static final int TAG_HOMEWORK_HARD = 1;
    public static final int TAG_HOMEWORK_EASY = 2;
    public static final int TAG_INFO          = 3;

    public static int difficulty(int t){
        if(t == TAG_HOMEWORK) return 2;
        else if(t == TAG_HOMEWORK_HARD) return 3;
        else if(t == TAG_HOMEWORK_EASY) return 1;
        else return -1;
    }

}
