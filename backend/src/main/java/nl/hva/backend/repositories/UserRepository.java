package nl.hva.backend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import nl.hva.backend.models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{

    @Query("SELECT u FROM User u WHERE u.emailAddress = ?1")
    User findByUsername(String username);
    User findUserById(Long id);
}
