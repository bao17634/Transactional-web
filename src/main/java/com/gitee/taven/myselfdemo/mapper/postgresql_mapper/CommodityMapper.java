package com.gitee.taven.myselfdemo.mapper.postgresql_mapper;

import com.gitee.taven.myselfdemo.entity.Commodity;
import com.gitee.taven.myselfdemo.entity.CommodityExample;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CommodityMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.commodity
     *
     * @mbg.generated
     */
    long countByExample(CommodityExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.commodity
     *
     * @mbg.generated
     */
    int deleteByExample(CommodityExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.commodity
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.commodity
     *
     * @mbg.generated
     */
    int insert(Commodity record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.commodity
     *
     * @mbg.generated
     */
    int insertSelective(Commodity record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.commodity
     *
     * @mbg.generated
     */
    List<Commodity> selectByExample(CommodityExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.commodity
     *
     * @mbg.generated
     */
    Commodity selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.commodity
     *
     * @mbg.generated
     */
    int updateByExampleSelective(@Param("record") Commodity record, @Param("example") CommodityExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.commodity
     *
     * @mbg.generated
     */
    int updateByExample(@Param("record") Commodity record, @Param("example") CommodityExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.commodity
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(Commodity record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.commodity
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(Commodity record);
}