package nl.hva.backend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import nl.hva.backend.models.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{

    User findByUsername(String usernam);
    User findUserById(Long id);
}
