package com.gitee.taven.myselfdemo.entity;

/**
 * Database Table Remarks:
 *   商户账号
 *
 * This class was generated by MyBatis Generator.
 * This class corresponds to the database table public.c_account
 */
public class CAccount {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column public.c_account.id
     *
     * @mbg.generated
     */
    private Integer id;

    /**
     * Database Column Remarks:
     *   用户账号
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column public.c_account.accout_code
     *
     * @mbg.generated
     */
    private String accoutCode;

    /**
     * Database Column Remarks:
     *   用户名
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column public.c_account.accout_name
     *
     * @mbg.generated
     */
    private String accoutName;

    /**
     * Database Column Remarks:
     *   账号金额
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column public.c_account.account_moey
     *
     * @mbg.generated
     */
    private Long accountMoey;

    /**
     * Database Column Remarks:
     *   运单号
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column public.c_account.order_code
     *
     * @mbg.generated
     */
    private String orderCode;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column public.c_account.id
     *
     * @return the value of public.c_account.id
     *
     * @mbg.generated
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column public.c_account.id
     *
     * @param id the value for public.c_account.id
     *
     * @mbg.generated
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column public.c_account.accout_code
     *
     * @return the value of public.c_account.accout_code
     *
     * @mbg.generated
     */
    public String getAccoutCode() {
        return accoutCode;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column public.c_account.accout_code
     *
     * @param accoutCode the value for public.c_account.accout_code
     *
     * @mbg.generated
     */
    public void setAccoutCode(String accoutCode) {
        this.accoutCode = accoutCode == null ? null : accoutCode.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column public.c_account.accout_name
     *
     * @return the value of public.c_account.accout_name
     *
     * @mbg.generated
     */
    public String getAccoutName() {
        return accoutName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column public.c_account.accout_name
     *
     * @param accoutName the value for public.c_account.accout_name
     *
     * @mbg.generated
     */
    public void setAccoutName(String accoutName) {
        this.accoutName = accoutName == null ? null : accoutName.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column public.c_account.account_moey
     *
     * @return the value of public.c_account.account_moey
     *
     * @mbg.generated
     */
    public Long getAccountMoey() {
        return accountMoey;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column public.c_account.account_moey
     *
     * @param accountMoey the value for public.c_account.account_moey
     *
     * @mbg.generated
     */
    public void setAccountMoey(Long accountMoey) {
        this.accountMoey = accountMoey;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column public.c_account.order_code
     *
     * @return the value of public.c_account.order_code
     *
     * @mbg.generated
     */
    public String getOrderCode() {
        return orderCode;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column public.c_account.order_code
     *
     * @param orderCode the value for public.c_account.order_code
     *
     * @mbg.generated
     */
    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode == null ? null : orderCode.trim();
    }
}