///////////////////////////////////////////////////////////////////////
/// {{CLASS_NAME}} Definition
/// Author: {{AUTHOR}}  Creation Date: {{TODAYS_DATE}}
/// {{{COPYRIGHT}}}
///
/// @brief
///  Implementation for the NS::{{CLASS_NAME}} class.
///    Note that the class name has to be qualified by the namespace
///    for Doxygen to correctly link to the class. 
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

#include "{{CLASS_NAME_LOWER}}.h"

namespace NS
{

// Create a real instance of the static class constant here.
constexpr uint32_t {{CLASS_NAME}}::EXAMPLE_CONST; 

{{CLASS_NAME}}::{{CLASS_NAME}}(uint32_t pram_1, uint32_t& param_2, uint32_t& param_3) 
{
    // Constructor implementation. Note that the method should not be implemented
    // here if it is implemented in the header file.
}

{{CLASS_NAME}}::~{{CLASS_NAME}}() 
{
    // Destructor implementation
}

} // namespace NS