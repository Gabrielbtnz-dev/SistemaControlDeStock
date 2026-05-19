package com.sistema.sistema.Service;


import com.sistema.sistema.Dto.DtoMethodOfPaymed.CajasDto;
import com.sistema.sistema.Model.MethodOfPaymedRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CajasService {

    private final MethodOfPaymedRepository paymedRepo;

    public CajasService(MethodOfPaymedRepository paymedRepo) {
        this.paymedRepo = paymedRepo;
    }

    public List<CajasDto> getMethodPaymed(){
        return paymedRepo.findAllByOrderByIdDesc().stream().map(
                m-> new CajasDto(
                        m.getId(),
                        m.getName(),
                        m.getMoneda(),
                        m.getSaldo(),
                        m.getActivo()
                )
        ).toList();
    }
}
