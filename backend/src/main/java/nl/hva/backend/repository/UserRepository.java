package nl.hva.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import nl.hva.backend.User;

public interface UserRepository extends JpaRepository<User,Long>{

    User findByUsername(String usernam);
    
}
