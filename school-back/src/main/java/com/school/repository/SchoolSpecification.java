package com.school.repository;

import com.school.model.School;
import com.school.model.SchoolType;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

public class SchoolSpecification {
    public static Specification<School> filter(String region, SchoolType type, Boolean active) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();


            if (region != null && !region.isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("region")), "%" + region.toLowerCase() + "%"));
            }

            if (type != null) {
                predicates.add(cb.equal(root.get("type"), type));
            }

            if (active != null) {
                predicates.add(cb.equal(root.get("active"), active));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
