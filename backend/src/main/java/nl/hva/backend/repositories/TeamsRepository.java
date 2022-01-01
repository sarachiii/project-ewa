package nl.hva.backend.repositories;

import nl.hva.backend.models.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class TeamsRepository {

    @PersistenceContext
    EntityManager entityManager;

    public List<Team> findAll(){
        TypedQuery<Team> query = this.entityManager.createNamedQuery("Team_find_all", Team.class);
        return query.getResultList();
    }

    //Saves a new team
    public Team save(Team team) {
        return entityManager.merge(team);
    }
}
