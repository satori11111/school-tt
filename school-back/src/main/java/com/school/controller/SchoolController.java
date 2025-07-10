package com.school.controller;

import com.school.model.School;
import com.school.model.SchoolType;
import com.school.service.SchoolService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/schools")
@CrossOrigin(origins = "http://localhost:3000")
public class SchoolController {
    private final SchoolService schoolService;

    public SchoolController(SchoolService schoolService) {
        this.schoolService = schoolService;
    }

    @GetMapping
    public List<School> getSchools(
        @RequestParam(required = false) String region,
        @RequestParam(required = false) SchoolType type,
        @RequestParam(required = false) Boolean isActive
    ) {
        return schoolService.getSchools(region, type, isActive);
    }

    @PostMapping
    public School create(@RequestBody School school) {
        return schoolService.create(school);
    }

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivate(@PathVariable Long id) {
        boolean success = schoolService.deactivate(id);
        return success ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
