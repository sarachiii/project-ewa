package nl.hva.backend.repositories;

import nl.hva.backend.models.Note;
import nl.hva.backend.models.Team;
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

    public List<Team> findAll() {
        TypedQuery<Team> query = this.entityManager.createNamedQuery("Team_find_all", Team.class);
        return query.getResultList();
    }

    //Saves a new team
    public Team save(Team team) {
        return entityManager.merge(team);
    }

    public Team findGreenHouseByTeamId(long id) {
        TypedQuery<Team> query = this.entityManager.createNamedQuery("Team_find_by_id", Team.class);
        query.setParameter("id", id);

        return query.getSingleResult();
    }

    //Deletes a team
    public void deleteById(long id) {
        this.entityManager.createNamedQuery("Team_delete_by_id")
                .setParameter("id", id)
                .executeUpdate();
    }
}
