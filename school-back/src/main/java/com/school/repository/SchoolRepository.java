package com.school.repository;

import com.school.model.School;
import com.school.model.SchoolType;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchoolRepository extends JpaRepository<School, Long> {
    List<School> findByRegionContainingIgnoreCaseAndTypeAndIsActive(String region, SchoolType type, boolean isActive);
}
