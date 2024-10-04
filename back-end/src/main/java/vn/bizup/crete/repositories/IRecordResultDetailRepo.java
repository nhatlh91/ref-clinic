package vn.bizup.crete.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.bizup.crete.models.dto.ServiceByDoctorDTO;
import vn.bizup.crete.models.entities.RecordResultDetail;

import java.util.List;

@Transactional
public interface IRecordResultDetailRepo extends JpaRepository<RecordResultDetail, Integer> {
    @Query("FROM RecordResultDetail WHERE recordResultId = :id")
    List<RecordResultDetail> findAllByRecordResultId(@Param("id") Integer id);

    @Modifying
    @Query("DELETE RecordResultDetail WHERE recordResultId = :id AND recordResultDetailId NOT IN :ids")
    void deleteServices(@Param("id") Integer id, @Param("ids") List<Integer> ids);

    @Query(nativeQuery = true,
            value = "SELECT user_id, full_name, COUNT(service_id) AS service_number FROM record_result_detail" +
                    " WHERE record_result_id IN (SELECT record_result_id FROM record_result WHERE !deleted AND YEAR(create_date) = :year AND (:month IS NULL OR MONTH(create_date) = :month))" +
                    " GROUP BY user_id, full_name")
    List<ServiceByDoctorDTO> findTotalServiceByDoctor(@Param("year") Integer year, @Param("month") Integer month);
}
