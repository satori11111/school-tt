package com.school.service;

import com.school.model.School;
import com.school.model.SchoolType;
import com.school.repository.SchoolRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class SchoolService {
    private final SchoolRepository schoolRepo;

    public SchoolService(SchoolRepository schoolRepo) {
        this.schoolRepo = schoolRepo;
    }

    public List<School> getSchools(String region, SchoolType type, Boolean isActive) {
        return schoolRepo.findAll().stream()
            .filter(s -> region == null || s.getRegion().equalsIgnoreCase(region))
            .filter(s -> type == null || s.getType() == type)
            .filter(s -> isActive == null || s.isActive() == isActive)
            .collect(Collectors.toList());
    }

    public School create(School school) {
        return schoolRepo.save(school);
    }

    public boolean deactivate(Long id) {
        return schoolRepo.findById(id).map(school -> {
            school.setActive(false);
            schoolRepo.save(school);
            return true;
        }).orElse(false);
    }
}
