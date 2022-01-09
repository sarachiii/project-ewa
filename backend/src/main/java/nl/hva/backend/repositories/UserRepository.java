package nl.hva.backend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import nl.hva.backend.models.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{
    List<User> findUsersByTeamId(Long id);
    User findByEmailAddress(String emailAddress);
    User findByFirstName(String firstname);
    User findUserById(Long id);
}
