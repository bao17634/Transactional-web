package com.gitee.taven.myselfdemo.service.impl;

import com.gitee.taven.myselfdemo.dto.OrderDTO;
import com.gitee.taven.myselfdemo.entity.*;
import com.gitee.taven.myselfdemo.mapper.mysql_mapper.SaasHouseMapper;
import com.gitee.taven.myselfdemo.mapper.postgresql_mapper.OrderMapper;
import com.gitee.taven.myselfdemo.mapper.postgresql_mapper.TssHouseMapper;
import com.gitee.taven.myselfdemo.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @ClassName: OrderServiceImpl
 * @Description: TODO
 * @Author: yanrong
 * @Date: 9/6/2019 2:07 PM
 * @Version: 1.0
 */
@Service
@Slf4j
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderMapper orderMapper;
    @Autowired
    TssHouseMapper tssHouseMapper;
    @Autowired
    SaasHouseMapper saasHouseMapper;

    @Override
    public OrderDTO queryInfo(){
        OrderDTO orderDTO=new OrderDTO();
        List<Order> listOrder=orderMapper.selectAll();
        List<TssHouse> listTss=tssHouseMapper.selectAll();
        List<SaasHouse> listSaas=saasHouseMapper.selectAll();
        orderDTO.setOrder(listOrder);
        orderDTO.setSaasHouse(listSaas);
        orderDTO.setTssHouse(listTss);
        return orderDTO;
    }

    @Override
    public Integer updateSaas(SaasHouse saasHouse) {
        SaasHouseExample example=new SaasHouseExample();
        example.createCriteria().andCommodityCodeEqualTo(saasHouse.getCommodityCode());
        return saasHouseMapper.updateByExampleSelective(saasHouse,example);
    }

    @Override
    public Integer updateTss(TssHouse tssHouse) {
        TssHouseExample example=new TssHouseExample();
        example.createCriteria().andCommodityCodeEqualTo(tssHouse.getCommodityCode());
        return tssHouseMapper.updateByExampleSelective(tssHouse,example);
    }

}
