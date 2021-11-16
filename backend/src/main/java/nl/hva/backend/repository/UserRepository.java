package nl.hva.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import nl.hva.backend.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{

    User findByUsername(String usernam);
    User findUserById(Long id);
}
