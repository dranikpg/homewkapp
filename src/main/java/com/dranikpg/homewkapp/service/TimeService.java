package com.dranikpg.homewkapp.service;

import dint.Dint;
import org.springframework.stereotype.Service;

@Service("tms")
public class TimeService {

    public int day = Dint.today();

}
