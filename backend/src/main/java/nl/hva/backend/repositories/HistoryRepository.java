package nl.hva.backend.repositories;

import nl.hva.backend.models.History;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class HistoryRepository {

    @PersistenceContext
    EntityManager entityManager;

    public List<History> findAll(int page, int limit) {
        TypedQuery<History> namedQuery = entityManager.createNamedQuery("History.findAll",History.class);
        return namedQuery.setFirstResult(page * limit).setMaxResults(limit).getResultList();
    }

    public Long countAll() {
        TypedQuery<Long> countQuery = entityManager.createNamedQuery("History.countAll",Long.class);
        return countQuery.getSingleResult();
    }

    public List<History> findByGreenHouseId(Long id, int page, int limit) {
        TypedQuery<History> namedQuery = entityManager.createNamedQuery("History.findByGreenHouseId",History.class);
        namedQuery.setParameter("ghId", id);
        return namedQuery.setFirstResult(page * limit).setMaxResults(limit).getResultList();
    }

    public Long countByGreenHouseId(Long id) {
        TypedQuery<Long> countQuery = entityManager.createNamedQuery("History.countByGreenHouseId", Long.class);
        countQuery.setParameter("ghId", id);
        return countQuery.getSingleResult();
    }

    public History save(History history){
        return entityManager.merge(history);
    }

}
