package com.school.service;

import com.school.model.School;
import com.school.model.SchoolType;
import com.school.repository.SchoolRepository;
import com.school.repository.SchoolSpecification;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class SchoolService {
    private final SchoolRepository schoolRepository;

    public SchoolService(SchoolRepository schoolRepository) {
        this.schoolRepository = schoolRepository;
    }

    public List<School> getSchools(String region, SchoolType type, Boolean isActive) {
        return schoolRepository.findAll(SchoolSpecification.filter(region, type, isActive));
    }

    public School create(School school) {
        return schoolRepository.save(school);
    }

    public boolean deactivate(Long id) {
        return schoolRepository.findById(id).map(school -> {
            school.setActive(false);
            schoolRepository.save(school);
            return true;
        }).orElse(false);
    }
}
