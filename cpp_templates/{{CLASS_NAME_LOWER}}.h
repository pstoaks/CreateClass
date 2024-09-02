///////////////////////////////////////////////////////////////////////
/// Class {{CLASS_NAME}}
/// Author: {{AUTHOR}}  Creation Date: {{TODAYS_DATE}}
/// {{{COPYRIGHT}}}
///
/// @brief
///  A one sentence summary of the file. Class is documented below.
///
/// @details
///  A more detailed description of the file.
///
/// @see reference 1
/// @see reference 2
/// 
/// @remarks
///   Notes to users
///////////////////////////////////////////////////////////////////////

#pragma once

#include <cstdint>

namespace NS
{

///////////////////////////////////////////////////////////////////////
/// @brief
///  A one sentence summary of the class.
///
/// @details
///  A more detailed description of the class.
///////////////////////////////////////////////////////////////////////
class {{CLASS_NAME}} : public BaseClass
{
public:
    static constexpr uint32_t EXAMPLE_CONST = {0xDEADBEAF};

    ///////////////////////////////////////////////////////////////////
    /// @brief Description of the following function.
    ///  
    ///
    /// @details If needed, a more detailed description of the class.
    ///    This template shows an example of a long description in order
    ///    to demonstrate wrap-around.
    ///
    /// @param [in]         param_1 - The first parameter
    /// @param [in, out]    param-2 - The second parameter
    /// @param [out]        param_3 - An output prameter
    ///
    /// @return The return value.
    ///
    /// @note Usage notes, particularly cautions.
    /// @see Namespace::Base_class::methodName()
    ///      If you do this Doxygen will insert a helpful link to the
    ///      documentation in the interface file.
    ///////////////////////////////////////////////////////////////////
    {{CLASS_NAME}}(uint32_t param_1, uint32_t& param_2, uint32_t& param_3);

    ///////////////////////////////////////////////////////////////////
    /// @brief The destructor is declared virtual in the base class.
    ///  It must be defined in the derived class where it is declared
    ///  'override'. Virtual declaration is optional. Every method should
    ///  be declared one of virtual, override, or final.
    ///////////////////////////////////////////////////////////////////
    ~{{CLASS_NAME}}() override = default;

protected:
    /// Protected members are visible to derived classes but not to client
    /// code.

private:
    /// Private members are not visible to either derived classes or client
    /// code.
    uint32_t    m_private1;     ///< An example of an in-line docstring
    uint32_t    m_private2;     ///< Another example.

private:
    // The following methods should be deleted unless they are explicitly
    // implemented.
    {{CLASS_NAME}}() = delete;                      ///< Default constructor
    {{CLASS_NAME}}({{CLASS_NAME}} const&) = delete; ///< Copy constructor
    {{CLASS_NAME}}& operator=({{CLASS_NAME}} const&) = delete; ///< Assignment operator
    {{CLASS_NAME}}({{CLASS_NAME}}&&) = delete;      ///< Move constructor
    {{CLASS_NAME}}& operator=({{CLASS_NAME}}&&) = delete; ///< Move assignment

}; // {{CLASS_NAME}}

} // NS
