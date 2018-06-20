package com.dranikpg.homewkapp.service;

import com.dranikpg.homewkapp.util.FileUtil;
import com.dranikpg.homewkapp.util.SubjectTable;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;


@Service("ss")
public class SubjectTableS {

    SubjectTable table;

    public SubjectTableS(){
        loadTable();
    }

    public SubjectTable t(){return table;}

    private void loadTable() {
        ObjectMapper mp = new ObjectMapper();
        try {
            table = mp.readValue(FileUtil.get("data/table.json"), SubjectTable.class);
        } catch (Exception e) {
            return;
        }
    }

}
