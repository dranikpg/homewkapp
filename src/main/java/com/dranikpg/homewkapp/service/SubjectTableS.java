package com.dranikpg.homewkapp.service;

import com.dranikpg.homewkapp.util.Util;
import com.dranikpg.homewkapp.util.SubjectTable;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;


@Service("ss")
public class SubjectTableS {

    SubjectTable table;

    public SubjectTableS(){
        loadTable();
    }

    public SubjectTable t(){return table;}

    public List<List<String>> d(){
        return table.data;
    }

    private void loadTable() {
        ObjectMapper mp = new ObjectMapper();
        try {
            table = mp.readValue(Util.get("data/table.json"), SubjectTable.class);
        } catch (Exception e) {
            return;
        }
    }
}
