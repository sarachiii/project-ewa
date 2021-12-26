package nl.hva.backend.repositories;

import netscape.javascript.JSObject;
import nl.hva.backend.models.History;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@Transactional
public class HistoryRepository {

    @PersistenceContext
    EntityManager entityManager;

    public List<History> findAll(){
        TypedQuery<History> namedQuery= entityManager.createNamedQuery("History.findAll",History.class);
        return  namedQuery.getResultList();
    }
    public List<History> findByGreenHouseId(Long id){
        TypedQuery<History> namedQuery= entityManager.createNamedQuery("History.findByGreenHouseId",History.class);
        namedQuery.setParameter("ghid",id);
        return namedQuery.getResultList();

    }
    public History saveHistoryRecord(History history){
        return entityManager.merge(history);
    }


}
